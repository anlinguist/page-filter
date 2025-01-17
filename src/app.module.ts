import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { json } from 'body-parser';
import { ValidateHtmlMiddleware } from './validate-html.middleware';
import { PayloadTooLargeFilter } from './payload-too-large.filter';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: PayloadTooLargeFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(json({ limit: '5mb' })).forRoutes('filterDoc')
      .apply(ValidateHtmlMiddleware).forRoutes('filterDoc');
  }
}