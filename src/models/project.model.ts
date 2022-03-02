import {Entity, model, property, hasMany} from '@loopback/repository';
import {Task} from './task.model';

@model()
export class Project extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  projectName: string;

  @property({
    type: 'date',
  })
  createdAt?: string;

  @property({
    type: 'date',
  })
  finishedAt?: string;

  @hasMany(() => Task, {keyTo: 'project'})
  tasks: Task[];

  constructor(data?: Partial<Project>) {
    super(data);
  }
}

export interface ProjectRelations {
  // describe navigational properties here
}

export type ProjectWithRelations = Project & ProjectRelations;
