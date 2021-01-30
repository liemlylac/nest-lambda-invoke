import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepository, TaskResource } from './task.resource';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [
    TaskService,
    {
      provide: TaskResource,
      useClass: TaskRepository,
    },
  ],
})
export class TaskModule {}
