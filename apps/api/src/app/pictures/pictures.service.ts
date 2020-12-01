import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { PictureEntity } from './picture.entity';

@Injectable()
export class PicturesService {
  constructor(
    @InjectRepository(PictureEntity)
    private picturesRepository: Repository<PictureEntity>,
  ) {}

  findAll(): Promise<PictureEntity[]> {
    return this.picturesRepository.find();
  }

  findOne(id: string): Promise<PictureEntity> {
    return this.picturesRepository.findOne(id);
  }

  async exists(id: string): Promise<boolean> {
    const picture = await this.picturesRepository.findOne(id);

    return Boolean(picture);
  }

  save(picture: Partial<PictureEntity>): Promise<PictureEntity> {
    return this.picturesRepository.save(picture);
  }

  remove(id: string) {
    return this.picturesRepository.delete(id);
  }
}
