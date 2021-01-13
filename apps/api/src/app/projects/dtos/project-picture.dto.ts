import { IsString, ValidateNested, IsDefined, IsOptional, IsArray, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

import { PictureDto } from './picture.dto';
import { TagDto } from './tag.dto';

export class ProjectPictureDto {
  @IsOptional()
  id?: number;

  @IsString()
  @IsOptional()
  ruTitle?: string;

  @IsString()
  @IsOptional()
  enTitle?: string;

  @IsString()
  @IsOptional()
  ruDescription?: string;

  @IsString()
  @IsOptional()
  enDescription?: string;

  @IsInt()
  order: number;

  @IsDefined()
  @ValidateNested()
  @Type(() => PictureDto)
  image: PictureDto;

  @ValidateNested()
  @IsArray()
  @IsOptional()
  @Type(() => TagDto)
  tags: TagDto[];
}
