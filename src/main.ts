import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from '@common/filters/all-exceptions.filter';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      // DTO에 없는 값 거름
      whitelist: true,
      // DTO에 정의되지 않은 값 있으면 에러
      forbidNonWhitelisted: true,
      // 자동으로 타입 변환 (string → number 같은거)
      transform: true,
    }),
  );

  const portNumber = 7070;
  app.enableCors({
    // 허락하고자 하는 요청 주소.
    // origin: allowlist,
    credentials: true,
  });
  //모든 RESTAPI는 api로 시작한다. ex: http://localhost:7070/api/*
  app.setGlobalPrefix('api');

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('KyungTae Board API')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(portNumber);
}
bootstrap();
