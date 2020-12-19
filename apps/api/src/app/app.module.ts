import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PictureEntity } from './entities/picture.entity';
import { ProjectPictureEntity } from './entities/project-picture.entity';
import { ProjectEntity } from './entities/project.entity';
import { UserEntity } from './entities/user.entity';

import { AppController } from './app.controller';
import { ProjectsModule } from './projects/projects.module';
import { PicturesModule } from './pictures/pictures.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { GlobalExceptionFilter } from './global-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST', 'localhost'),
        port: configService.get('DATABASE_PORT', 5432),
        username: configService.get('DATABASE_USER', 'lyubimov'),
        password: configService.get('DATABASE_PASSWORD', 'lyubiroman'),
        database: configService.get('DATABASE_NAME', 'lyubimovstudio'),
        entities: [
          PictureEntity,
          ProjectPictureEntity,
          ProjectEntity,
          UserEntity,
        ],
        synchronize: true,
      }),
    }),
    ProjectsModule,
    PicturesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ]
})
export class AppModule {}
