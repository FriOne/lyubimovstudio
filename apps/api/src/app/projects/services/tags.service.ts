import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Raw, Repository, WhereExpression } from 'typeorm';

import { Tag } from '@lyubimovstudio/api-interfaces';

import { TagEntity } from '../../entities/tag.entity';

type Filters = {
  name?: string;
};

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagEntity)
    private tagsRepository: Repository<TagEntity>,
  ) {}

  async findAll(filters?: Filters) {
    const { name } = filters || {};
    const where: Record<string, any> = {};

    if (name) {
      where.name = Raw(alias => `${alias} ILIKE '%${name}%'`);
    }

    return this.tagsRepository.find({
      where,
      order: {
        name: 'ASC',
      },
    });
  }

  async exists(name: string): Promise<boolean> {
    const tag = await this.tagsRepository.findOne({
      where: { name },
    });

    return Boolean(tag);
  }

  save(tag: Tag) {
    return this.tagsRepository.save(tag);
  }

  remove(id: number) {
    return this.tagsRepository.delete(id);
  }
}
