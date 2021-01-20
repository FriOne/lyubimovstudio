import { IsArray, IsNotEmpty, IsString, ValidateNested, IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

import { ProjectPictureDto } from './project-picture.dto';

export class ProjectDto {
  @IsOptional()
  id: number;

  @IsNotEmpty()
  @IsString()
  ruTitle: string;

  @IsString()
  @IsOptional()
  enTitle?: string;

  @IsString()
  @IsOptional()
  ruDescription?: string;

  @IsString()
  @IsOptional()
  enDescription?: string;

  @IsBoolean()
  isPublished: boolean;

  @ValidateNested()
  @IsArray()
  @Type(() => ProjectPictureDto)
  pictures?: ProjectPictureDto[];
}
