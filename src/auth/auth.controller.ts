import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/register.dto';
import { LoginRequestDto } from './dto/login.dto';
import type { Request, Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthResponse } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { Authorization } from './decorators/authorization.decorators';
import { Authorized } from './decorators/authorized.decorator';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ! register
  @ApiOperation({
    summary: 'Создание аккаунта',
    description: 'Создает новый аккаунт пользователя',
  }) // информация про ендпоинт для Swagger
  @ApiOkResponse({ type: AuthResponse })
  @ApiBadRequestResponse({
    description: 'Некоректные входные данные',
  })
  @ApiConflictResponse({
    description: 'Пользователь с такой почтой уже существует',
  })
  @Post('register')
  @HttpCode(HttpStatus.CREATED) // указывается статус-код который будет при успешном ответе (можно просто число, напр 200 или енам из HttpStatus)
  async register(
    @Res({ passthrough: true }) res: Response, // passthrough - https://youtu.be/HT6cm4GoSIw?t=21939
    @Body() dto: RegisterRequestDto,
  ) {
    return this.authService.register(res, dto);
  }

  // ! login
  @ApiOperation({
    summary: 'Вход в систему',
    description: 'Авторизует пользователя и выдает токен доступа',
  })
  @ApiOkResponse({ type: AuthResponse })
  @ApiBadRequestResponse({
    description: 'Некоректные входные данные',
  })
  @ApiNotFoundResponse({ description: 'Пользователь не найден' })
  @Post('login')
  @HttpCode(HttpStatus.OK) // указывается статус-код который будет при успешном ответе (можно просто число, напр 200 или енам из HttpStatus)
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginRequestDto,
  ) {
    return this.authService.login(res, dto);
  }

  // ! refresh
  @ApiOperation({
    summary: 'Обновление токена',
    description: 'Генерирует новый токен доступа',
  })
  @ApiOkResponse({ type: AuthResponse })
  @ApiUnauthorizedResponse({
    description: 'Недействительныйrefresh токен',
  })
  @Post('refresh')
  @HttpCode(HttpStatus.OK) // указывается статус-код который будет при успешном ответе (можно просто число, напр 200 или енам из HttpStatus)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refresh(req, res);
  }

  // ! logout
  @ApiOperation({
    summary: 'Выход из системы',
    description: 'Удаляет токен для выхода из системы',
  })
  @Post('logout')
  @HttpCode(HttpStatus.OK) // указывается статус-код который будет при успешном ответе (можно просто число, напр 200 или енам из HttpStatus)
  async logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }

  // ! @me
  // @UseGuards(AuthGuard('jwt')) // https://youtu.be/HT6cm4GoSIw?t=23313
  @Authorization()
  @Get('@me')
  @HttpCode(HttpStatus.OK)
  async me(@Authorized('id') id: string) {
    return { id };
  }
}
