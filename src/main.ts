import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { BadRequestExceptionFilter } from './filters/bad-request-exception.filter';
import { NotFoundExceptionFilter } from './filters/not-found-exception.filter';
import { InternalServerErrorExceptionFilter } from './filters/internal-server-error-exception.filter';
import { DuplicateRecordExceptionFilter } from './filters/duplicate-record-exception.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // remove propriedades que não estão no DTO.
    forbidNonWhitelisted: true, // lança um erro se propriedades desconhecidas forem passadas.
    transform: true, // transforma a payload para o tipo especificado no DTO.
  }));
  app.useGlobalFilters(
    new BadRequestExceptionFilter(),
    new NotFoundExceptionFilter(),
    new InternalServerErrorExceptionFilter(),
    new DuplicateRecordExceptionFilter()
  );
  await app.listen(3000);
}
bootstrap();
