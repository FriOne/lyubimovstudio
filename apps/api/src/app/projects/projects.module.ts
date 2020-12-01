import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { ProjectEntity } from './project.entity';
import { ProjectPictureEntity } from './project-picture.entity';
import { PicturesModule } from '../pictures/pictures.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectPictureEntity,
      ProjectEntity,
    ]),
    PicturesModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
