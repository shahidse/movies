// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { initDb } from './init-db';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config'; // Adjust the path if necessary
async function bootstrap() {
  // Access the configuration values directly from the environment variables
  const dbHost = process.env.DB_HOST || 'localhost';
  const dbPort = +process.env.DB_PORT || 3306;
  const dbUsername = process.env.DB_USERNAME || 'root';
  const dbPassword = process.env.DB_PASSWORD || '';
  const dbDatabase = process.env.DB_DATABASE || 'movies';

  // Initialize the database
  await initDb(dbHost, dbPort, dbUsername, dbPassword, dbDatabase);
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Movie API')
    .setDescription('The movie API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
