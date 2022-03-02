import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {User} from './user.model';

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
  createdAt?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  isDone?: boolean;
  @property({
    type: 'string',
  })
  project?: string;

  @belongsTo(() => User, {name: 'hasOwner'})
  owner: string;


  @property({
    type: 'string',
  })
  previousTask?: string;

  constructor(data?: Partial<Task>) {
    super(data);
  }
}

export interface TaskRelations {
  // describe navigational properties here
}

export type TaskWithRelations = Task & TaskRelations;
