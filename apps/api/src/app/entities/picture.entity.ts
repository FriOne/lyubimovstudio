import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

import { Picture, ProjectPicture } from '@lyubimovstudio/api-interfaces';

@Entity({ name: 'picture' })
export class PictureEntity implements Picture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;

  @OneToOne('ProjectPictureEntity', 'image')
  projectPicture: ProjectPicture;
}
