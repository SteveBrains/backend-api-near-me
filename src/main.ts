import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { GlobalService } from '@libs/libs';
import * as cors from 'cors';

async function bootstrap() {
  GlobalService.appName = 'near-me';
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    methods: ['GET', 'POST'],
    origin: [process.env.PLAYGROUND_URL],
  });

  await app.listen(process.env.PORT);
  new Logger('Bootstrap').verbose('Running At ' + process.env.PORT);
}

bootstrap();
