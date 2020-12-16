import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { Project, ProjectPicture } from '@lyubimovstudio/api-interfaces';

@Entity({ name: 'project' })
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

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;

  @OneToMany(
    'ProjectPictureEntity',
    'project',
    { cascade: true },
  )
  pictures: ProjectPicture[];
}
