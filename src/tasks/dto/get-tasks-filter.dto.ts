import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../domain/task-status.enum';

export class GetTasksFilterDto {
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
  @IsOptional()
  @IsString()
  search?: string;
}
