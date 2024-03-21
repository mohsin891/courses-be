import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ServiceAccount } from 'firebase-admin';
import * as admin from 'firebase-admin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const configService: ConfigService = app.get(ConfigService);
  // Set the config options
  const adminConfig: ServiceAccount = {
    "projectId": configService.get<string>('PORJECT_ID'),
    "privateKey": configService.get<string>('PRIVATE_KEY')
      .replace(/\\n/g, '\n'),
    "clientEmail": configService.get<string>('CLIENT_EMAIL'),
  };
  // Initialize the firebase admin app
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    databaseURL: `https://${configService.get<string>('PORJECT_ID')}.firebaseio.com`,
  });

  app.enableCors();
  await app.listen(process.env.PORT);
}
bootstrap();
