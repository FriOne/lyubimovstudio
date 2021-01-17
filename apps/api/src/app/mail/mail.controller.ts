import { Body, Controller, Post } from '@nestjs/common';

import { Public } from '../auth/guards/is-public-route';
import { MailService } from './mail.service';
import { RequestDto } from './request.dto';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Public()
  @Post('request')
  makeRequest(@Body() request: RequestDto) {
    const { name, phoneNumber, message } = request;

    return this.mailService.sendRequestEmail(name, phoneNumber, message);
  }
}
