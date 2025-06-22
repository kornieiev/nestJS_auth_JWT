import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({
    description: 'Почтовый адрес',
    example: 'lola@mail.com',
  })
  @IsString({ message: 'Почта должно быть строкой' })
  @IsNotEmpty({ message: 'Почта не может быть пустым полем' })
  @IsEmail({}, { message: 'Некоректный формат почты' })
  email: string;

  @ApiProperty({
    description: 'Пароль от аккаунта',
    example: 'qweqwe',
    minLength: 6,
    maxLength: 128,
  })
  @IsString({ message: 'Пароль должно быть строкой' })
  @IsNotEmpty({ message: 'Пароль не может быть пустым полем' })
  @MaxLength(8, { message: 'Пароль должен быть не более 8 символов' })
  @MinLength(3, { message: 'Пароль должен быть не менее 3 символов' })
  password: string;
}
