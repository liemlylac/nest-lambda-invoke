import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Entity('task')
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255, nullable: false })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('varchar', { name: 'created_by', length: 50, nullable: false })
  createdBy: string;

  @Column('varchar', { name: 'assigned_to', length: 50, nullable: true })
  assignedTo: string;

  @Column('varchar', { length: 50, nullable: false, default: 'open' })
  status: TaskStatus;

  @Column('datetime', {
    name: 'created_date',
    nullable: false,
    default: () => 'current_timestamp()',
  })
  createdDate: Date;

  @Column('datetime', { name: 'due_date', nullable: true })
  dueDate: Date;

  @Column('datetime', {
    name: 'updated_date',
    nullable: true,
    default: () => 'current_timestamp()',
    onUpdate: 'current_timestamp()',
  })
  updatedDate: Date;
}
