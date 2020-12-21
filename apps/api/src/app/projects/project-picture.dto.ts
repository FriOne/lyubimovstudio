import { IsString, isInt, IsNotEmpty, ValidateNested } from 'class-validator';

import { PictureDto } from './picture.dto';

export class ProjectPictureDto {
  @isInt()
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
  @isInt()
  order: number;

  @ValidateNested()
  image: PictureDto;
}
