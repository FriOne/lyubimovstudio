import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      email: 'lyubimov@eml.ru',
      password: '333',
    },
    {
      userId: 2,
      email: 'lubimov.nsk@gmail.com',
      password: '4444',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find(user => (user.email === email));
  }
}
