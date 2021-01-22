import { NestFactory } from '@nestjs/core';
import { INestApplicationContext } from '@nestjs/common';
import inquirer, { Question } from 'inquirer';

import { AppModule } from './app/app.module';
import { UsersModule } from './app/users/users.module';
import { UsersService } from './app/users/users.service';

(async () => {
  const command = await askCommand();
  const app = await NestFactory.createApplicationContext(AppModule);

  if (command === 'create:user') {
    await createUserCommand(app);
  }
})();

async function askCommand() {
  const commands = [
    { name: 'Create user', value: 'create:user' }
  ];

  const { command } = await inquirer.prompt([{
    type: 'list',
    name: 'command',
    message: 'Choose the command',
    choices: commands
  }]);

  return command;
}

async function createUserCommand(app: INestApplicationContext) {
  const usersService: UsersService = app.select(UsersModule).get(UsersService);
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const validateEmail = async function(email: string) {
    const done = this.async();
    const valid = re.test(email);

    if (!valid) {
      return done('Incorrect email input');
    }

    const user = await usersService.findByEmail(email);

    if (user) {
      return done('User already exists');
    }

    done(null, true);
  };

  const questions: Question[] = [
    {
      type: 'input',
      name: 'email',
      message: 'Email',
      validate: validateEmail,
    },
    {
      type: 'password',
      name: 'password',
      message: 'Password',
    },
  ];

  const answers = await inquirer.prompt(questions);

  await usersService.save(answers);

  await app.close();

  console.log('The user was created');
}
