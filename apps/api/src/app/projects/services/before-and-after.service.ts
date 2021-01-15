import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { BeforeAndAfterEntity } from '../../entities/before-and-after.entity';

@Injectable()
export class BeforeAndAfterService {
  constructor(
    @InjectRepository(BeforeAndAfterEntity)
    private beforeAndAfterRepository: Repository<BeforeAndAfterEntity>,
  ) {}

  async findAll(page: number, limit: number) {
    const [rows, total] = await this.beforeAndAfterRepository.findAndCount({
      take: limit,
      skip: page * limit,
      relations: ['before', 'after', 'project'],
      order: {
        createdAt: 'DESC',
      },
    });

    return { rows, total };
  }

  findOne(id: string): Promise<BeforeAndAfterEntity> {
    return this.beforeAndAfterRepository
      .createQueryBuilder('beforeAndAfter')
      .leftJoinAndSelect('beforeAndAfter.before', 'before')
      .leftJoinAndSelect('beforeAndAfter.after', 'after')
      .leftJoinAndSelect('beforeAndAfter.project', 'project')
      .whereInIds(id)
      .orderBy('beforeAndAfter.createdAt', 'DESC')
      .getOne();
  }

  async remove(id: string) {
    return this.beforeAndAfterRepository.delete(id);
  }

  save(beforeAndAfter: Partial<BeforeAndAfterEntity>) {
    return this.beforeAndAfterRepository.save(beforeAndAfter);
  }
}
