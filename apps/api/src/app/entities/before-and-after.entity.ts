import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { BeforeAndAfter, Picture, Project } from '@lyubimovstudio/api-interfaces';

@Entity({ name: 'before_and_after' })
export class BeforeAndAfterEntity implements BeforeAndAfter {
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

  @Column({ default: false, type: 'boolean' })
  isPublished: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;

  @OneToOne('PictureEntity', 'before', { onDelete: 'CASCADE', eager: true })
  @JoinColumn()
  before: Picture;

  @OneToOne('PictureEntity', 'after', { onDelete: 'CASCADE', eager: true })
  @JoinColumn()
  after: Picture;

  @OneToOne('ProjectEntity', 'project', { onDelete: 'CASCADE' })
  @JoinColumn()
  project: Project;
}
