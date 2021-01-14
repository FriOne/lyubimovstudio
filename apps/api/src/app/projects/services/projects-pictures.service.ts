import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { ProjectPictureEntity } from '../../entities/project-picture.entity';
import { TagEntity } from '../../entities/tag.entity';

export type Filters = {
  tagId?: number;
};

@Injectable()
export class ProjectsPicturesService {
  constructor(
    @InjectRepository(ProjectPictureEntity)
    private projectPictureRepository: Repository<ProjectPictureEntity>,
    @InjectRepository(TagEntity)
    private tagsRepository: Repository<TagEntity>,
  ) {}

  async findAll(page: number, limit: number, filters?: Filters) {
    const { tagId } = filters;

    let query = this.projectPictureRepository
      .createQueryBuilder('projectPicture')
      .leftJoin('projectPicture.tags', 'tags')
      .leftJoinAndSelect('projectPicture.image', 'image')
      .innerJoin('projectPicture.project', 'project')
      .addSelect('project.id')
      .take(limit)
      .skip(page * limit)
      .orderBy('projectPicture.createdAt', 'DESC');

    if (tagId) {
      query = query.where('"projectPicture_tags"."tagId" = :tagId', { tagId });
    }

    const [rows, total] = await query.getManyAndCount();

    return { rows, total };
  }

  findById(id: number) {
    return this.projectPictureRepository.findOne(id);
  }

  save(projectPicture: Partial<ProjectPictureEntity>) {
    return this.projectPictureRepository.save(projectPicture);
  }
}
