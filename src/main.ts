import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  );
  const configService = app.get(ConfigService);
  const port = configService.get<number>('SERVER_PORT') || 3000;
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(port);
}
bootstrap();
