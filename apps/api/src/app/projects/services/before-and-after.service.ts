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
      relations: ['beforeAndAfter.before', 'beforeAndAfter.after', 'beforeAndAfter.project'],
      order: {
        createdAt: 'DESC',
      },
    });

    return { rows, total };
  }

  async remove(id: string) {
    await this.beforeAndAfterRepository.delete(id);
  }

  save(beforeAndAfter: Partial<BeforeAndAfterEntity>) {
    return this.beforeAndAfterRepository.save(beforeAndAfter);
  }
}
