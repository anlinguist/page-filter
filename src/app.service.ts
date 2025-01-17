import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';

@Injectable()
export class AppService {
  extractSearchResults(htmlString: string, filter: string): string {
    const $ = cheerio.load(htmlString);
    const element = $(filter);

    if (element.length) {
      return $.html(element);
    }

    return '';
  }
}