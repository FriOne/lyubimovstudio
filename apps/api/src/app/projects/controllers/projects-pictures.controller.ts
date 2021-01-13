import { Body, Controller, Get, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { Public } from '../../auth/guards/is-public-route';
import { ProjectPictureEntity } from '../../entities/project-picture.entity';
import { PicturesService } from '../../pictures/pictures.service';
import { IntParam, IntQuery } from '../../pipes';
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
    @IntQuery('page') page,
    @IntQuery('limit') limit,
    @Query('tag') tag,
  ) {
    return this.projectsPicturesService.findAll(page, limit, { tag });
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file) {
    const newFileName = await this.picturesService.saveFile(file);
    const image = await this.picturesService.save({ name: newFileName });

    return this.projectsPicturesService.save({ image } as any);
  }

  @Patch(':id')
  async update(@IntParam('id') id, @Body() projectPicture: ProjectPictureDto) {
    const { id: _, ...projectPictureWithoutId } = projectPicture;
    const newProjectPictrure = await this.projectsPicturesService.save({ id, ...projectPictureWithoutId } as ProjectPictureEntity);

    return this.projectsPicturesService.findById(newProjectPictrure.id);
  }
}
