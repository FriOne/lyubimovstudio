import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Raw, Repository } from 'typeorm';

import { ProjectPictureEntity } from '../../entities/project-picture.entity';
import { TagEntity } from '../../entities/tag.entity';

export type Filters = {
  tag?: string;
};

@Injectable()
export class ProjectsPicturesService {
  constructor(
    @InjectRepository(ProjectPictureEntity)
    private projectPictureRepository: Repository<ProjectPictureEntity>,
    @InjectRepository(TagEntity)
    private tagsRepository: Repository<TagEntity>,
  ) {}

  findAll(page: number, limit: number, filters?: Filters) {
    const { tag } = filters;
    const where = {};

    if (tag) {
      where['tags.name'] = tag;
    }

    return this.projectPictureRepository.findAndCount({
      where,
      take: limit,
      skip: page * limit,
      relations: ['tags'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findById(id: number) {
    return this.projectPictureRepository.findOne(id);
  }

  save(projectPicture: Partial<ProjectPictureEntity>) {
    return this.projectPictureRepository.save(projectPicture);
  }
}
