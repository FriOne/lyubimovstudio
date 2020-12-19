import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User, UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return null;
    }

    const passwordIsCorrect = await this.usersService.checkUserPassword(password, user.password);

    if (!passwordIsCorrect) {
      return null;
    }

    const { password: _, ...result } = user;

    return result;
  }

  async logIn(user: User) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
