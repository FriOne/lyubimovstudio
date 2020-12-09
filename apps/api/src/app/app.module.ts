import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { ProjectsModule } from './projects/projects.module';
import { PictureEntity } from './pictures/picture.entity';
import { ProjectPictureEntity } from './projects/project-picture.entity';
import { ProjectEntity } from './projects/project.entity';
import { PicturesModule } from './pictures/pictures.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'uploads'),
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST', 'localhost'),
        port: configService.get('DATABASE_PORT', 4000),
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
  ],
  controllers: [AppController]
})
export class AppModule {}
