import { IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class PictureDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsOptional()
  name?: string;
}
