import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ValidateHtmlMiddleware implements NestMiddleware {
  private readonly logger = new Logger(ValidateHtmlMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      if (!req.body.html || typeof req.body.html !== 'string') {
        this.logger.log('Invalid HTML payload', req.body);
        return res.status(400).json({ message: 'Invalid HTML payload' });
      }

      if (!req.body.filter || typeof req.body.filter !== 'string') {
        this.logger.log('Invalid search filter', req.body);
        return res.status(400).json({ message: 'Invalid search filter' });
      }

      return res.status(400).json({ message: 'Invalid HTML payload' });
    }
    next();
  }
}