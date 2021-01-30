import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { Resource } from '../common/resource';
import { InjectRepository } from '@nestjs/typeorm';

export abstract class TaskResource extends Resource<Task> {}

@Injectable()
export class TaskRepository extends TaskResource {
  constructor(
    @InjectRepository(Task)
    private readonly repo: Repository<Task>,
  ) {
    super(Task.name);
  }

  find(options): Promise<Task[]> {
    return this.repo.find(options);
  }

  findOne(options): Promise<Task> {
    return this.repo.findOne(options);
  }

  count(options): Promise<number> {
    return this.repo.count(options);
  }

  create(data: Partial<Task>): Task {
    return this.repo.create(data);
  }

  insert(data: Task | Task[]): Promise<any> {
    return this.repo.insert(data);
  }

  save(data, options?: any): Promise<Task | Task[]> {
    return this.repo.save(data, options);
  }

  update(id: number | string, data?: Partial<Task>): Promise<any> {
    return this.repo.update(id, data);
  }

  preload(entityLike: Partial<Task>): Promise<Task> {
    return this.repo.preload(entityLike);
  }

  delete(id: number | string): Promise<DeleteResult> {
    return this.repo.delete(id);
  }
}
