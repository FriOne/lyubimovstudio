import { Controller, Post, UseGuards } from '@nestjs/common';

import { User } from '../pipes';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './guards/is-public-route';
import type { UserInfo } from '../users/users.service';

@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post()
  async create(@User() user: UserInfo) {
    return this.authService.logIn(user);
  }
}
