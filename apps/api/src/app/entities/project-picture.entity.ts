import {
  Entity,
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';

import type { Project, ProjectPicture, Picture, Tag } from '@lyubimovstudio/api-interfaces';

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
    { onDelete: 'CASCADE', eager: true }
  )
  @JoinColumn()
  image: Picture;

  @ManyToOne('ProjectEntity', 'pictures', { onDelete: 'CASCADE' })
  project?: Partial<Project>;

  @ManyToMany('TagEntity', 'tags', { eager: true })
  @JoinTable()
  tags: Tag[];
}
