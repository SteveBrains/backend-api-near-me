import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { indexProviders } from '@libs/libs/elastic-search/providers';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT);
  new Logger('Bootstrap').verbose('Running At ' + process.env.PORT);
  indexProviders.forEach((indexProvider) => {
    const service = app.get(indexProvider);
    service.initChangeStream();
  });
}
bootstrap();
