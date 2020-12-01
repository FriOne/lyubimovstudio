import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { ProjectEntity } from './project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectsRepository: Repository<ProjectEntity>,
  ) {}

  findAll(): Promise<ProjectEntity[]> {
    return this.projectsRepository.find({ });
  }

  findOne(id: string): Promise<ProjectEntity> {
    return this.projectsRepository.findOne(id, {
      relations: ['pictures', 'pictures.image'],
    });
  }

  async exists(id: string): Promise<boolean> {
    const project = await this.projectsRepository.findOne(id);

    return Boolean(project);
  }

  save(project: Partial<ProjectEntity>): Promise<ProjectEntity> {
    return this.projectsRepository.save(project);
  }

  remove(id: string) {
    return this.projectsRepository.delete(id);
  }
}
