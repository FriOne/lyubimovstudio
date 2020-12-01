import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

import { ProjectsModule } from './projects/projects.module';
import { PictureEntity } from './pictures/picture.entity';
import { ProjectPictureEntity } from './projects/project-picture.entity';
import { ProjectEntity } from './projects/project.entity';
import { PicturesModule } from './pictures/pictures.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'assets'),
      serveRoot: '/assets',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'upload'),
      serveRoot: '/upload',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 4000,
      username: 'lyubimov',
      password: 'lyubiroman',
      database: 'lyubimovstudio',
      entities: [
        PictureEntity,
        ProjectPictureEntity,
        ProjectEntity,
      ],
      synchronize: true,
    }),
    ProjectsModule,
    PicturesModule,
  ],
})
export class AppModule {}
