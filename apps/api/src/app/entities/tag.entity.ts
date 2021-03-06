import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';

import type { ProjectPicture, Tag } from '@lyubimovstudio/api-interfaces';

@Entity({ name: 'tag' })
export class TagEntity implements Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;

  @ManyToMany('ProjectPictureEntity', 'projectPictures')
  projectPictures: ProjectPicture[];
}
