import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Raw, Repository } from 'typeorm';

import { ProjectEntity } from '../entities/project.entity';
import { ProjectPictureEntity } from '../entities/project-picture.entity';
import { PictureEntity } from '../entities/picture.entity';
import { PicturesService } from '../pictures/pictures.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectsRepository: Repository<ProjectEntity>,
    @InjectRepository(PictureEntity)
    private pictureRepository: Repository<PictureEntity>,
    @InjectRepository(ProjectPictureEntity)
    private projectPictureRepository: Repository<ProjectPictureEntity>,
    private picturesService: PicturesService,
  ) {}

  async findAll(page = 0, limit, name = '') {
    let where;

    if (name) {
      where = [
        { ruTitle: Raw(alias => `${alias} ILIKE '%${name}%'`) },
        { enTitle: Raw(alias => `${alias} ILIKE '%${name}%'`) },
      ];
    }

    const [rows, total] = await this.projectsRepository.findAndCount({
      where,
      take: limit,
      skip: page * limit,
      relations: ['pictures', 'pictures.image'],
      order: {
        createdAt: 'DESC',
      },
    });

    return { rows, total };
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

  async remove(id: string) {
    const picturesNames = await this.getAllProjectPictureFileNames(id);

    await this.projectsRepository.delete(id);

    // Middle entities will be removed by cascade
    for (const pictureName of picturesNames) {
      await this.picturesService.removeFile(pictureName);
    }
  }

  async deletePicturesWithoutProject() {
    const pictures = await this.pictureRepository
      .createQueryBuilder('picture')
      .leftJoinAndSelect('picture.projectPicture', 'projectPicture')
      .where('projectPicture.id IS NULL')
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

  private async getAllProjectPictureFileNames(id: string) {
    const project = await this.projectsRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.pictures', 'pictures')
      .leftJoinAndSelect('pictures.image', 'image')
      .whereInIds(id)
      .getOne();

    return project.pictures.map(picture => picture.image.name);
  }
}
