import { Body, Controller, Get, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { Public } from '../../auth/guards/is-public-route';
import { ProjectPictureEntity } from '../../entities/project-picture.entity';
import { PicturesService } from '../../pictures/pictures.service';
import { IntParam, IntQuery, User } from '../../pipes';
import type { UserInfo } from '../../users/users.service';
import { ProjectPictureDto } from '../dtos/project-picture.dto';
import { ProjectsPicturesService } from '../services/projects-pictures.service';

@Controller('projects/pictures')
export class ProjectsPicturesController {
  constructor(
    private picturesService: PicturesService,
    private projectsPicturesService: ProjectsPicturesService,
  ) {}

  @Public()
  @Get()
  findAll(
    @IntQuery('page') page: number,
    @IntQuery('limit') limit: number,
    @IntQuery('tagId') tagId: number,
    @User() user: UserInfo,
  ) {
    const isPublished = user ? undefined : true;
    const filters = {
      tagId,
      isPublished,
    };

    return this.projectsPicturesService.findAll(page, limit, filters);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file) {
    const { name, width, height } = await this.picturesService.saveFile(file);
    const image = await this.picturesService.save({ name, width, height });

    // eslint-disable-next-line
    return this.projectsPicturesService.save({ image } as any);
  }

  @Patch(':id')
  async update(@IntParam('id') id: number, @Body() projectPicture: ProjectPictureDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, ...projectPictureWithoutId } = projectPicture;
    const newProjectPictrure = await this.projectsPicturesService.save({ id, ...projectPictureWithoutId } as ProjectPictureEntity);

    return this.projectsPicturesService.findById(newProjectPictrure.id);
  }
}
