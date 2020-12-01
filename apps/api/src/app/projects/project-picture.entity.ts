import { Entity, Column, OneToOne, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

import { Project, ProjectPicture } from '@lyubimovstudio/api-interfaces';

import { PictureEntity } from '../pictures/picture.entity';
import { ProjectEntity } from './project.entity';

@Entity()
export class ProjectPictureEntity implements ProjectPicture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  ruTitle?: string;

  @Column({ default: '' })
  enTitle?: string;

  @Column({ default: '' })
  ruDescription?: string;

  @Column({ default: '' })
  enDescription?: string;

  @OneToOne(() => PictureEntity, { cascade: ['insert', 'update'] })
  @JoinColumn()
  image: PictureEntity;

  @ManyToOne(() => ProjectEntity, project => project.pictures)
  project: Project;
}
