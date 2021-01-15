import { Body, Controller, Delete, Get, NotFoundException, Patch, Post } from '@nestjs/common';

import { Public } from '../../auth/guards/is-public-route';
import { BeforeAndAfterEntity } from '../../entities/before-and-after.entity';
import { IntParam, IntQuery } from '../../pipes';
import { BeforeAndAfterDto } from '../dtos/before-and-after.dto';
import { BeforeAndAfterService } from '../services/before-and-after.service';

@Controller('before-and-after')
export class BeforeAndAfterController {
  constructor(
    private beforeAndAfterService: BeforeAndAfterService,
  ) {}

  @Public()
  @Get()
  findAll(
    @IntQuery('page') page: number,
    @IntQuery('limit') limit: number,
  ) {
    return this.beforeAndAfterService.findAll(page, limit);
  }

  @Public()
  @Get(':id')
  async findOne(@IntParam('id') id) {
    const beforeAndAfter = await this.beforeAndAfterService.findOne(id);

    if (!beforeAndAfter) {
      throw new NotFoundException();
    }

    return beforeAndAfter;
  }

  @Post()
  async create(@Body() beforeAndAfter: BeforeAndAfterDto) {
    const { id: _, ...beforeAndAfterWithoutId } = beforeAndAfter;

    return this.beforeAndAfterService.save(beforeAndAfterWithoutId as BeforeAndAfterEntity);
  }

  @Patch(':id')
  async update(@IntParam('id') id, @Body() beforeAndAfter: BeforeAndAfterDto) {
    const { id: _, ...beforeAndAfterWithoutId } = beforeAndAfter;

    return this.beforeAndAfterService.save({ id, ...beforeAndAfterWithoutId } as BeforeAndAfterEntity);
  }

  @Delete(':id')
  async remove(@IntParam('id') id) {
    return this.beforeAndAfterService.remove(id);
  }
}
