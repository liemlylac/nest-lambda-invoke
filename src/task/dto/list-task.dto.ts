import { IsOptional, IsString } from 'class-validator';

export class ListTaskDto {
  @IsOptional()
  @IsString()
  createdBy?: string;
}
