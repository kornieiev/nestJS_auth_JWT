import { Controller } from '@nestjs/common';
import { PrismaService } from './prisma.service';
// import { RegisterRequestDto } from 'src/auth/dto/register.dto';
@Controller('prisma')
export class PrismaController {
  constructor(private readonly prismaService: PrismaService) {}
}
