import { Body, Controller, Delete, Get, ConflictException, Post } from '@nestjs/common';

import { Public } from '../../auth/guards/is-public-route';
import { IntParam } from '../../pipes';
import { TagDto } from '../dtos/tag.dto';
import { TagsService } from '../services/tags.service';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Public()
  @Get()
  findAll() {
    return this.tagsService.findAll();
  }

  @Post()
  async create(@Body() tag: TagDto) {
    const { id: _, ...tagWithoutId } = tag;

    const exists = await this.tagsService.exists(tagWithoutId.name);

    if (exists) {
      throw new ConflictException();
    }

    return this.tagsService.save(tagWithoutId);
  }

  @Delete(':id')
  async remove(@IntParam('id') id) {
    return this.tagsService.remove(id);
  }
}
