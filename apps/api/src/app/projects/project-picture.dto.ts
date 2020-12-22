import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';

import { PictureDto } from './picture.dto';

export class ProjectPictureDto {
  id?: number;

  @IsString()
  ruTitle?: string;

  @IsString()
  enTitle?: string;

  @IsString()
  ruDescription?: string;

  @IsString()
  enDescription?: string;

  @IsNotEmpty()
  order: number;

  @ValidateNested()
  image: PictureDto;
}
