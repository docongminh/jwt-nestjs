import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
import { AppModule } from '@jwt/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('JWT Example')
    .setDescription('Example JWT API description')
    .setVersion('1.0')
    .addTag('jwt')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(5001);
  Logger.log(
    `🚀 Application is running on: http://localhost:5001`
  );
}
bootstrap();
