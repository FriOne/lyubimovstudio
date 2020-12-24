import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { PicturesModule } from '../pictures/pictures.module';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { ProjectEntity } from '../entities/project.entity';
import { ProjectPictureEntity } from '../entities/project-picture.entity';
import { TasksService } from './tasks.service';
import { PictureEntity } from '../entities/picture.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectEntity,
      ProjectPictureEntity,
      PictureEntity,
    ]),
    PicturesModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [ProjectsController],
  providers: [
    ProjectsService,
    TasksService,
  ],
})
export class ProjectsModule {}
