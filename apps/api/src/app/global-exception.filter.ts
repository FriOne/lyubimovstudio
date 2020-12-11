import {
  ArgumentsHost,
  Catch, HttpException,
  HttpStatus
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception.code === 'ENOENT') {
      return response.sendStatus(HttpStatus.NOT_FOUND);
    }

    const status = exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.sendStatus(status);
  }
}
