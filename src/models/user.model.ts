import {Entity, model, property, hasMany} from '@loopback/repository';
import {Role, UserStatus} from "../enums";
import {Task} from './task.model';
import {Project} from './project.model';
import {ProjectUser} from './project-user.model';

@model()
export class User extends Entity {
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
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
  })
  fullName?: string;

  @property({
    type: 'string',
    default: UserStatus.ACTIVE,
  })
  status?: string;

  @property({
    type: 'string',
    default: Role.USER,
  })
  role?: string;

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

  @hasMany(() => Task, {keyTo: 'ownedBy'})
  ownedTasks: Task[];

  @hasMany(() => Task, {keyTo: 'createdBy'})
  createdTasks: Task[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
