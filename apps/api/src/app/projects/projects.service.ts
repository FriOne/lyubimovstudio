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
    return this.projectsRepository.find({
      relations: ['pictures', 'pictures.image'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findOne(id: string): Promise<ProjectEntity> {
    return this.projectsRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.pictures', 'pictures')
      .leftJoinAndSelect('pictures.image', 'images')
      .whereInIds(id)
      .orderBy('createdAt', 'DESC')
      .orderBy('pictures.order', 'ASC')
      .getOne();
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
