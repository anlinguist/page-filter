import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {

    it('should exit if message body doesn\'t include html or filter', () => {
      expect(() => appController.filterDoc(
        '',
        ''
      )).toThrow();
    });
    it('should filter based on id', () => {
      expect(appController.filterDoc(
        '<div><span id="test">Test</span></div>',
        '#test'
      ).searchResults).toBe("<span id=\"test\">Test</span>");
    });
  });
});
