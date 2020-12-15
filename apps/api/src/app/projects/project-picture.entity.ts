import {
  Entity,
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

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

  @Column({ default: 0 })
  order: number;

  @OneToOne(() => PictureEntity, { cascade: ['insert', 'update', 'remove'] })
  @JoinColumn()
  image: PictureEntity;

  @ManyToOne(() => ProjectEntity, project => project.pictures)
  project: Project;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;
}
