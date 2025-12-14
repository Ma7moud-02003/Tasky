/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
const app = await NestFactory.create(AppModule);
await app.listen(process.env.PORT||3000);
app.useGlobalPipes(new ValidationPipe({whitelist:true,forbidNonWhitelisted:true}));
 if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Task Management API')
      .setDescription('API for Admin to manage and assign tasks')
      .setVersion('1.0')
      .addTag('tasks')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document); // Swagger UI
  }

}
bootstrap();
