import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { TaskResource } from './task.resource';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  protected readonly logger = new Logger(TaskService.name);
  constructor(private readonly taskResource: TaskResource) {}

  getAll(options): Promise<Task[]> {
    return this.taskResource.find(options);
  }

  getOne(id): Promise<Task> {
    return this.taskResource.findOne(id);
  }

  async create(data: CreateTaskDto): Promise<Task> {
    try {
      const task = this.taskResource.create(data);
      task.status = TaskStatus.Open;
      await this.taskResource.insert(task);
      return task;
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException('Cannot create task');
    }
  }

  async update(id: number, data: UpdateTaskDto): Promise<Task> {
    await this.taskResource.checkEntity({ id });
    const task = await this.taskResource.preload({ id, ...data });
    try {
      await this.taskResource.update(id, task);
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException('Cannot update task');
    }
    return task;
  }

  async delete(id: number) {
    await this.taskResource.checkEntity({ id });
    try {
      await this.taskResource.delete(id);
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException('Cannot delete task');
    }
    return id;
  }
}
