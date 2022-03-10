import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Task, TaskRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class TaskRepository extends DefaultCrudRepository<
  Task,
  typeof Task.prototype.id,
  TaskRelations
> {

  public readonly getOwner: BelongsToAccessor<User, typeof Task.prototype.id>;

  public readonly getCreator: BelongsToAccessor<User, typeof Task.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Task, dataSource);
    this.getCreator = this.createBelongsToAccessorFor('getCreator', userRepositoryGetter,);
    this.registerInclusionResolver('getCreator', this.getCreator.inclusionResolver);
    this.getOwner = this.createBelongsToAccessorFor('getOwner', userRepositoryGetter,);
    this.registerInclusionResolver('getOwner', this.getOwner.inclusionResolver);
  }
}
