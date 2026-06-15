import { TASK_PRIORITIES, TASK_STATUSES } from '../interfaces/tasks.interface';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

function toEnumArray<T extends string>(value: unknown): T[] | undefined {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value as T[];
  }

  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean) as T[];
}

export class QueryTasksDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Transform(({ value }) => toEnumArray<TASK_STATUSES>(value))
  @IsArray()
  @IsEnum(TASK_STATUSES, { each: true })
  status?: TASK_STATUSES[];

  @IsOptional()
  @Transform(({ value }) => toEnumArray<TASK_PRIORITIES>(value))
  @IsArray()
  @IsEnum(TASK_PRIORITIES, { each: true })
  priority?: TASK_PRIORITIES[];

  @IsOptional()
  @IsIn(['createdAt'])
  sortBy?: 'createdAt';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  @IsOptional()
  @IsUUID()
  userId?: string;
}
