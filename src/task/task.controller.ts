import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ListTaskDto } from './dto/list-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAll(@Query() query: ListTaskDto) {
    return this.taskService.getAll(query);
  }

  @Get('/:id')
  getById(@Param('id', ParseIntPipe) id) {
    return this.taskService.getOne({ id });
  }

  @Post('')
  create(@Body() data: CreateTaskDto) {
    return this.taskService.create(data);
  }

  @Put('/:id')
  update(@Param('id', ParseIntPipe) id, @Body() data: UpdateTaskDto) {
    return this.taskService.update(id, data);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id) {
    return this.taskService.delete(id);
  }
}
