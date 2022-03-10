import {Entity, model, property, belongsTo} from '@loopback/repository';
import {TaskStatus} from "../enums";
import {User} from './user.model';
import {Project} from './project.model';
import {Task} from './task.model';

@model()
export class Task extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  taskName: string;

  @property({
    type: 'date',
  })
  startDate?: string;

  @property({
    type: 'date',
  })
  dueDate?: string;

  @property({
    type: 'string',
    default: TaskStatus.TODO,
  })
  status?: string;

  @property({
    type: 'date',
  })
  doneAt?: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  createdAt?: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  updatedAt?: string;

  @belongsTo(() => User, {name: 'owner'})
  ownedBy: string;

  @belongsTo(() => User, {name: 'creator'})
  createdBy: string;

  @belongsTo(() => Task, {name: 'previousTask'})
  isLatterTaskOf: string;

  @belongsTo(() => Project)
  projectId: string;

  constructor(data?: Partial<Task>) {
    super(data);
  }
}

export interface TaskRelations {
  // describe navigational properties here
}

export type TaskWithRelations = Task & TaskRelations;
