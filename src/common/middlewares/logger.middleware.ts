import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  // noinspection JSUnusedGlobalSymbols
  // eslint-disable-next-line
  use(req: Request, res: Response, next: Function) {
    this.logger.log(
      `Request ${req.method} ${req.baseUrl}`,
      LoggerMiddleware.name,
    );
    next();
  }
}
