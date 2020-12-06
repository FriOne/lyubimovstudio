import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';

import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    const project = await this.projectsService.findOne(id);

    if (!project) {
      throw new NotFoundException();
    }

    return project;
  }

  @Post()
  async create(@Body() body) {
    const { id, ...project } = body;

    return this.projectsService.save(project);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return this.projectsService.remove(id);
  }

  @Patch(':id')
  async update(@Param('id') id, @Body() body) {
    const projectExists = await this.projectsService.exists(id);

    if (!projectExists) {
      throw new NotFoundException();
    }

    return this.projectsService.save(body);
  }
}
