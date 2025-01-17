import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { json } from 'body-parser';
import { ValidateHtmlMiddleware } from './validate-html.middleware';

@Module({
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(json({ limit: '1mb' })).forRoutes('filterDoc')
      .apply(ValidateHtmlMiddleware).forRoutes('filterDoc');
  }
}