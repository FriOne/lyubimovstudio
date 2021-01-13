import { IsNotEmpty, IsInt } from 'class-validator';

export class PictureDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
