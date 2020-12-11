import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { ProjectsModule } from './projects/projects.module';
import { PictureEntity } from './pictures/picture.entity';
import { ProjectPictureEntity } from './projects/project-picture.entity';
import { ProjectEntity } from './projects/project.entity';
import { PicturesModule } from './pictures/pictures.module';
import { UsersModule } from './users/users.module';

import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { GlobalExceptionFilter } from './global-exception.filter';
import { AuthModule } from './auth/auth.module';

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
