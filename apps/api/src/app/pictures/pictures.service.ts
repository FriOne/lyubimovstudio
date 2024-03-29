import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';
import { v4 as uuid } from 'uuid';
import sharp from 'sharp';

import { PictureEntity } from '../entities/picture.entity';
import { UPLOAD_FOLDER } from './constants';

const unlinkFile = promisify(fs.unlink);
const mkdir = promisify(fs.mkdir);

@Injectable()
export class PicturesService {
  constructor(
    @InjectRepository(PictureEntity)
    private picturesRepository: Repository<PictureEntity>,
  ) {}

  async findAll(page = 0, limit = 10) {
    const [rows, total] = await this.picturesRepository.findAndCount({
      take: limit,
      skip: page * limit,
      order: {
        createdAt: 'DESC',
      },
    });

    return { rows, total };
  }

  findOne(id: number): Promise<PictureEntity> {
    return this.picturesRepository.findOneBy({ id });
  }

  async exists(id: number): Promise<boolean> {
    const picture = await this.picturesRepository.findOneBy({ id });

    return Boolean(picture);
  }

  save(picture: Partial<PictureEntity>): Promise<PictureEntity> {
    return this.picturesRepository.save(picture);
  }

  async remove(id: number) {
    const picture = await this.findOne(id);

    await this.picturesRepository.delete(id);

    this.removeFile(picture.name);
  }

  async saveFile(file) {
    const newFileName = `${uuid()}.jpg`;
    const filePath = path.resolve(`${UPLOAD_FOLDER}/${newFileName}`);
    const mobileFilePath = path.resolve(`${UPLOAD_FOLDER}/sm-${newFileName}`);

    // eslint-disable-next-line
    await mkdir(UPLOAD_FOLDER, { recursive: true } as any);

    const { width, height } = await sharp(file.buffer)
      .resize(2048, null, { withoutEnlargement: true })
      .toFormat('jpg')
      .toFile(filePath);

    await sharp(file.buffer)
      .resize(1024, null, { withoutEnlargement: true })
      .toFormat('jpg')
      .toFile(mobileFilePath);

    return { name: newFileName, width, height };
  }

  async removeFile(name: string, silent = true) {
    try {
      await unlinkFile(path.resolve(UPLOAD_FOLDER, name));
      await unlinkFile(path.resolve(UPLOAD_FOLDER, `sm-${name}`));
    }
    catch(error) {
      if (!silent) {
        throw error;
      }
    }
  }
}
