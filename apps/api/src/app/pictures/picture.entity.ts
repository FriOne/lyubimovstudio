import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { Picture } from '@lyubimovstudio/api-interfaces';

@Entity()
export class PictureEntity implements Picture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
