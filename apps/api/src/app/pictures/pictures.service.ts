import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import fs from 'fs';
import { promisify } from 'util';
import path, { extname } from 'path';
import { v4 as uuid } from 'uuid';

import { PictureEntity } from '../entities/picture.entity';
import { UPLOAD_FOLDER } from './constants';

const unlinkFile = promisify(fs.unlink);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

@Injectable()
export class PicturesService {
  constructor(
    @InjectRepository(PictureEntity)
    private picturesRepository: Repository<PictureEntity>,
  ) {}

  findAll(): Promise<PictureEntity[]> {
    return this.picturesRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findOne(id: number): Promise<PictureEntity> {
    return this.picturesRepository.findOne(id);
  }

  async exists(id: string): Promise<boolean> {
    const picture = await this.picturesRepository.findOne(id);

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

  async saveFile(file: any) {
    const extension = extname(file.originalname);
    const newFileName = `${uuid()}${extension}`;
    const filePath = path.resolve(`${UPLOAD_FOLDER}/${newFileName}`);

    await mkdir(UPLOAD_FOLDER, { recursive: true } as any);
    await writeFile(filePath, file.buffer);

    return newFileName;
  }

  async removeFile(name: string, silent = true) {
    try {
      await unlinkFile(path.resolve(UPLOAD_FOLDER, name));
    }
    catch(error) {
      if (!silent) {
        throw error;
      }
    }
  }
}
