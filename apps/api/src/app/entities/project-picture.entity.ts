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

import { Project, ProjectPicture, Picture } from '@lyubimovstudio/api-interfaces';

@Entity({ name: 'project_picture' })
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

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;

  @OneToOne(
    'PictureEntity',
    'projectPicture',
    { onDelete: 'CASCADE', eager: true, cascade: true }
  )
  @JoinColumn()
  image: Picture;

  @ManyToOne(
    'ProjectEntity',
    'pictures',
    { onDelete: 'CASCADE' }
  )
  project: Project;
}
