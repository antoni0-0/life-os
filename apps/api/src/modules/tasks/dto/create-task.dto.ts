import { TASK_PRIORITIES, TASK_STATUSES } from '../interfaces/tasks.interface';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MinLength(1)
  title!: string;

  @IsString()
  @MinLength(1)
  category!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TASK_PRIORITIES)
  priority?: TASK_PRIORITIES;

  @IsOptional()
  @IsEnum(TASK_STATUSES)
  status?: TASK_STATUSES;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsUUID()
  userId!: string;
}
