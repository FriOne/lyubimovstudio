import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

import type { BeforeAndAfter, Picture, ProjectPicture } from '@lyubimovstudio/api-interfaces';

@Entity({ name: 'picture' })
export class PictureEntity implements Picture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  width: number;

  @Column()
  height: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;

  @OneToOne('ProjectPictureEntity', 'image')
  projectPicture: ProjectPicture;

  @OneToOne('BeforeAndAfterEntity', 'before')
  before: BeforeAndAfter;

  @OneToOne('BeforeAndAfterEntity', 'after')
  after: BeforeAndAfter;
}
