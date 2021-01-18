import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PictureEntity } from '../../entities/picture.entity';
import { ProjectPictureEntity } from '../../entities/project-picture.entity';
import { PicturesService } from '../../pictures/pictures.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private picturesService: PicturesService,
    @InjectRepository(PictureEntity)
    private pictureRepository: Repository<PictureEntity>,
    @InjectRepository(ProjectPictureEntity)
    private projectPictureRepository: Repository<ProjectPictureEntity>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async cleanUpPictures() {
    this.logger.log('Cleaning up useless pictures');

    await this.deletePicturesWithoutLink();
  }

  async deletePicturesWithoutLink() {
    const pictures = await this.pictureRepository
      .createQueryBuilder('picture')
      .leftJoin('picture.projectPicture', 'projectPicture')
      .leftJoin('picture.before', 'before')
      .leftJoin('picture.after', 'after')
      .where('projectPicture.id IS NULL')
      .andWhere('after.id IS NULL')
      .andWhere('before.id IS NULL')
      .getMany();

    const projectPicturesWithoutImage = await this.projectPictureRepository
      .createQueryBuilder('projectPicture')
      .leftJoinAndSelect('projectPicture.image', 'image')
      .leftJoin('projectPicture.project', 'project')
      .where('project.id IS NULL')
      .orWhere('image.id IS NULL')
      .getMany();


    for (const projectPictureWithoutImage of projectPicturesWithoutImage) {
      pictures.push(projectPictureWithoutImage.image as PictureEntity);

      await this.projectPictureRepository.remove(projectPictureWithoutImage);
    }

    for (const picture of pictures) {
      await this.picturesService.removeFile(picture.name);
      await this.picturesService.remove(picture.id);
    }
  }
}
