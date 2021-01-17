import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class RequestDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  message?: string;
}
