import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { FindOperator, Repository, SelectQueryBuilder } from 'typeorm';

import { ProjectEntity } from '../../entities/project.entity';
import { PicturesService } from '../../pictures/pictures.service';
import { ProjectPictureEntity } from '../../entities/project-picture.entity';

type ProjectsFilters = {
  name?: string;
  isPublished?: boolean;
  withPictures?: boolean;
};

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectsRepository: Repository<ProjectEntity>,
    private picturesService: PicturesService,
  ) {}

  async findAll(page = 0, limit = 10, filters: ProjectsFilters) {
    const { name = '', withPictures = false, isPublished } = filters;
    const where: Record<string, unknown> = {};

    if (isPublished !== undefined) {
      where.isPublished = isPublished;
    }

    let query = this.projectsRepository
      .createQueryBuilder('project')
      .take(limit)
      .skip(page * limit)
      .leftJoinAndSelect('project.pictures', 'projectPicture')
      .leftJoinAndSelect('projectPicture.image', 'image')
      .where(where)
      .orderBy({
        'project.createdAt': 'DESC',
        'projectPicture.order': 'ASC'
      });

    if (name) {
      const operator = new FindOperator('ilike', `%${name}%`);

      query = query.andWhere([
        { ruTitle: operator },
        { enTitle: operator },
      // eslint-disable-next-line
      ] as any);
    }

    if (withPictures) {
      query = query
        .leftJoin(
          (qb: SelectQueryBuilder<ProjectPictureEntity>) => qb
            .select('COUNT("projectPicture"."id")', 'count')
            .addSelect('projectPicture.projectId', 'projectId')
            .from('project_picture', 'projectPicture')
            .groupBy('projectPicture.projectId'),
          'picturesCount',
          'project.id = "picturesCount"."projectId"',
        )
        .andWhere('"picturesCount"."count" > 0');
    }

    const [rows, total] = await query.getManyAndCount();

    return { rows, total };
  }

  findOne(id: number): Promise<ProjectEntity> {
    return this.projectsRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.pictures', 'projectPicture')
      .leftJoinAndSelect('projectPicture.image', 'image')
      .leftJoinAndSelect('projectPicture.tags', 'tags')
      .whereInIds(id)
      .orderBy({
        'project.createdAt': 'DESC',
        'projectPicture.order': 'ASC'
      })
      .getOne();
  }

  async exists(id: number): Promise<boolean> {
    const project = await this.projectsRepository.findOneBy({ id });

    return Boolean(project);
  }

  save(project: Partial<ProjectEntity>): Promise<ProjectEntity> {
    return this.projectsRepository.save(project);
  }

  async remove(id: number) {
    const picturesNames = await this.getAllProjectPictureFileNames(id);

    await this.projectsRepository.delete(id);

    // Middle entities will be removed by cascade
    for (const pictureName of picturesNames) {
      await this.picturesService.removeFile(pictureName);
    }
  }

  private async getAllProjectPictureFileNames(id: number) {
    const project = await this.projectsRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.pictures', 'pictures')
      .leftJoinAndSelect('pictures.image', 'image')
      .whereInIds(id)
      .getOne();

    if (!project) {
      return [];
    }

    return project.pictures
      .filter(picture => picture.image?.name)
      .map(picture => picture.image.name);
  }
}
