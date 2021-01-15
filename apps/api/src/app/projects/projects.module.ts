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
import { BeforeAndAfterEntity } from '../entities/before-and-after.entity';
import { BeforeAndAfterController } from './controllers/before-and-after.controller';
import { BeforeAndAfterService } from './services/before-and-after.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectEntity,
      ProjectPictureEntity,
      PictureEntity,
      BeforeAndAfterEntity,
      TagEntity,
    ]),
    PicturesModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [
    ProjectsPicturesController,
    ProjectsController,
    BeforeAndAfterController,
    TagsController,
  ],
  providers: [
    ProjectsService,
    ProjectsPicturesService,
    BeforeAndAfterService,
    TasksService,
    TagsService,
  ],
})
export class ProjectsModule {}
