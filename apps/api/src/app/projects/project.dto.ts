import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { ProjectPictureDto } from './project-picture.dto';

export class ProjectDto {
  @IsNotEmpty()
  @IsString()
  ruTitle: string;

  @IsString()
  enTitle?: string;

  @IsString()
  ruDescription?: string;

  @IsString()
  enDescription?: string;

  @ValidateNested()
  pictures?: ProjectPictureDto[];
}
