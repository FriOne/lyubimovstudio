import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Project, ProjectPicture } from '@lyubimovstudio/api-interfaces';

import { ProjectPictureEntity } from './project-picture.entity';

@Entity()
export class ProjectEntity implements Project {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  ruTitle: string;

  @Column({ default: '' })
  enTitle: string;

  @Column({ default: '' })
  ruDescription?: string;

  @Column({ default: '' })
  enDescription?: string;

  @OneToMany(
    () => ProjectPictureEntity,
    picture => picture.project,
    { cascade: ['insert', 'update'] },
  )
  pictures: ProjectPicture[];
}
