import { Body, Controller, HttpCode, HttpException, HttpStatus, Logger, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name)

  @Post('/filterDoc')
  @HttpCode(200)
  filterDoc(
    @Body('html') htmlString: string,
    @Body('filter') filter: string
  ): { searchResults: string | null } {
    if (!htmlString || typeof htmlString !== 'string') {
      this.logger.log('Invalid HTML payload', htmlString);
      throw new HttpException('Invalid HTML payload', HttpStatus.BAD_REQUEST);
    }

    if (!filter || typeof filter !== 'string') {
      this.logger.log('Invalid search filter', filter);
      throw new HttpException('Invalid search filter', HttpStatus.BAD_REQUEST);
    }

    const searchResults = this.appService.extractSearchResults(htmlString, filter);

    return { searchResults };
  }
}
