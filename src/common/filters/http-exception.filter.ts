import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger();

  // noinspection JSUnusedGlobalSymbols
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const request: Request = ctx.getRequest<Request>();
    const path = `${request.method} ${request.url}`;

    if (exception.response) {
      exception.message = exception.response.message;
    }

    const status = exception.getStatus();

    this.logger.log({
      request: `${request.method} ${request.url}`,
      requestBody: `${JSON.stringify(request.body)}`,
      response: `${status} ${exception.message}`,
    });

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      path: path,
      timestamp: new Date().toISOString(),
    });
  }
}
