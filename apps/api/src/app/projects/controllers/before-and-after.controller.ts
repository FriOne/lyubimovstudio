import { Body, Controller, Delete, Get, NotFoundException, Patch, Post } from '@nestjs/common';

import { Public } from '../../auth/guards/is-public-route';
import { BeforeAndAfterEntity } from '../../entities/before-and-after.entity';
import { IntParam, IntQuery, User } from '../../pipes';
import { UserInfo } from '../../users/users.service';
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
    @User() user: UserInfo,
  ) {
    const isPublished = user ? undefined : true;
    const filters = {
      isPublished,
    };

    return this.beforeAndAfterService.findAll(page, limit, filters);
  }

  @Public()
  @Get(':id')
  async findOne(@IntParam('id') id: number) {
    const beforeAndAfter = await this.beforeAndAfterService.findOne(id);

    if (!beforeAndAfter) {
      throw new NotFoundException();
    }

    return beforeAndAfter;
  }

  @Post()
  async create(@Body() beforeAndAfter: BeforeAndAfterDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, ...beforeAndAfterWithoutId } = beforeAndAfter;

    return this.beforeAndAfterService.save(beforeAndAfterWithoutId as BeforeAndAfterEntity);
  }

  @Patch(':id')
  async update(@IntParam('id') id, @Body() beforeAndAfter: BeforeAndAfterDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, ...beforeAndAfterWithoutId } = beforeAndAfter;

    return this.beforeAndAfterService.save({ id, ...beforeAndAfterWithoutId } as BeforeAndAfterEntity);
  }

  @Delete(':id')
  async remove(@IntParam('id') id: number) {
    return this.beforeAndAfterService.remove(id);
  }
}
