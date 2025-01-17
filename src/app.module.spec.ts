import { MiddlewareConsumer, NestModule } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "./app.module";
import { ValidateHtmlMiddleware } from "./validate-html.middleware";
import * as bodyParser from "body-parser";

describe('AppModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should configure middleware on filterDoc route', () => {
    const jsonMock = jest.spyOn(bodyParser, 'json').mockImplementation(() => jest.fn());

    const applyMock = jest.fn().mockReturnThis();
    const forRoutesMock = jest.fn().mockReturnThis();

    const consumer: MiddlewareConsumer = {
      apply: applyMock,
      forRoutes: forRoutesMock,
    } as any;

    const appModule: NestModule = new AppModule();
    appModule.configure(consumer);

    expect(jsonMock).toHaveBeenCalledWith({ limit: '1mb' });
    expect(applyMock).toHaveBeenNthCalledWith(1, expect.any(Function));
    expect(applyMock).toHaveBeenNthCalledWith(2, ValidateHtmlMiddleware);
    expect(forRoutesMock).toHaveBeenCalledWith('filterDoc');

    jsonMock.mockRestore();
  });
});