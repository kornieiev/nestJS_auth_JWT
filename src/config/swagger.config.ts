import { DocumentBuilder } from '@nestjs/swagger';

export function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('NestJS-JWT-Auth API')
    .setDescription('A simple and powerful REST API built with NestJS')
    .setVersion('1.0.0')
    .addBearerAuth()
    .setContact('Lola', 'https://lola.com', 'support@lola.com')
    .build();
}
