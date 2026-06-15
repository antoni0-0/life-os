import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { QueryTasksDto } from '../dto/query-tasks.dto';
import { TasksService } from '../services/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }

  @Get()
  findMany(@Query() query: QueryTasksDto) {
    return this.tasksService.findMany(query);
  }
}
