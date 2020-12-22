import { Controller, Get } from '@nestjs/common';

import { Public } from './auth/guards/is-public-route';

@Controller()
export class AppController {
  @Get('ping')
  @Public()
  pingPong() {
    return 'pong';
  }
}
