import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { PicturesModule } from '../pictures/pictures.module';
import { ProjectEntity } from '../entities/project.entity';
import { ProjectPictureEntity } from '../entities/project-picture.entity';
import { TasksService } from './services/tasks.service';
import { PictureEntity } from '../entities/picture.entity';
import { TagEntity } from '../entities/tag.entity';
import { ProjectsController } from './controllers/projects.controller';
import { ProjectsService } from './services/projects.service';
import { ProjectsPicturesController } from './controllers/projects-pictures.controller';
import { ProjectsPicturesService } from './services/projects-pictures.service';
import { TagsController } from './controllers/tags.controller';
import { TagsService } from './services/tags.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectEntity,
      ProjectPictureEntity,
      PictureEntity,
      TagEntity,
    ]),
    PicturesModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [
    ProjectsController,
    ProjectsPicturesController,
    TagsController,
  ],
  providers: [
    ProjectsService,
    ProjectsPicturesService,
    TasksService,
    TagsService,
  ],
})
export class ProjectsModule {}
