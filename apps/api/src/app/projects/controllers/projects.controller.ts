import { Body, Controller, Delete, Get, NotFoundException, Patch, Post, Query } from '@nestjs/common';

import { Public } from '../../auth/guards/is-public-route';
import { IntParam, IntQuery, User } from '../../pipes';
import { ProjectDto } from '../dtos/project.dto';
import { ProjectEntity } from '../../entities/project.entity';
import { ProjectsService } from '../services/projects.service';
import type { UserInfo } from '../../users/users.service';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Public()
  @Get()
  findAll(
    @IntQuery('page') page: number,
    @IntQuery('limit') limit: number,
    @Query('name') name: string,
    @User() user: UserInfo,
  ) {
    const withPictures = Boolean(user);
    const isPublished = user ? undefined : true;
    const filters = {
      name,
      withPictures,
      isPublished,
    };

    return this.projectsService.findAll(page, limit, filters);
  }

  @Public()
  @Get(':id')
  async findOne(@IntParam('id') id: number) {
    const project = await this.projectsService.findOne(id);

    if (!project) {
      throw new NotFoundException();
    }

    return project;
  }

  @Post()
  async create(@Body() project: ProjectDto) {
    return this.projectsService.save(project as ProjectEntity);
  }

  @Delete(':id')
  async remove(@IntParam('id') id: number) {
    return this.projectsService.remove(id);
  }

  @Patch(':id')
  async update(@IntParam('id') id, @Body() project: ProjectDto) {
    const projectExists = await this.projectsService.exists(id);

    if (!projectExists) {
      throw new NotFoundException();
    }

    return this.projectsService.save({ id, ...project } as ProjectEntity);
  }
}
