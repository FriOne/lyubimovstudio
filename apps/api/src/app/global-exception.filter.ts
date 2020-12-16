import {
  ArgumentsHost,
  Catch, HttpException,
  HttpStatus, Logger
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger('global');

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception.code === 'ENOENT') {
      return response.sendStatus(HttpStatus.NOT_FOUND);
    }

    const status = exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    this.logger.error(exception.toString());

    response.sendStatus(status);
  }
}
