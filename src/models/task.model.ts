import {Entity, model, property, hasOne} from '@loopback/repository';

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
    type: 'string',
    required: true,
  })
  owner: string;

  @property({
    type: 'string',
  })
  project?: string;

  @property({
    type: 'date',
  })
  createdAt?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  isDone?: boolean;

  @hasOne(() => Task, {keyTo: 'previousTask'})
  previousTask: Task;

  constructor(data?: Partial<Task>) {
    super(data);
  }
}

export interface TaskRelations {
  // describe navigational properties here
}

export type TaskWithRelations = Task & TaskRelations;
