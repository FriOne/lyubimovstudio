import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../entities/user.entity';

export type UserInfo = {
  id: number;
  email: string;
};

export type UserWithPassword = Omit<UserInfo, 'id'> & { password: string; };

const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  async save(user: UserWithPassword) {
    const { password: plainPassword, ...rest } = user;
    const password = await this.encryptPassword(plainPassword);

    return this.usersRepository.save({
      password,
      ...rest,
    });
  }

  checkUserPassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  private encryptPassword(password: string) {
    return bcrypt.hash(password, SALT_ROUNDS);
  }
}
