/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { join } from 'path';
async function bootstrap() {
const app = await NestFactory.create(AppModule);
app.useGlobalPipes(new ValidationPipe({whitelist:true,forbidNonWhitelisted:true}));
 
  app.enableCors({
    origin: '*',          
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

    const config = new DocumentBuilder()
      .setTitle('Task Management API')
      .setDescription('API for Admin to manage and assign tasks')
      .setVersion('1.0')
      .addTag('tasks')
      .build();
    const document = SwaggerModule.createDocument(app, config);
  writeFileSync(join(__dirname, 'swagger.json'), JSON.stringify(document));
  SwaggerModule.setup('api', app, document);
 await app.listen(3000);

  }

bootstrap();
