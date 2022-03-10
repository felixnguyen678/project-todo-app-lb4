import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {User, UserRelations, Task} from '../models';
import {TaskRepository} from './task.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly assignedTasks: HasManyRepositoryFactory<Task, typeof User.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('TaskRepository') protected taskRepositoryGetter: Getter<TaskRepository>,
  ) {
    super(User, dataSource);
    this.assignedTasks = this.createHasManyRepositoryFactoryFor('assignedTasks', taskRepositoryGetter,);
    this.registerInclusionResolver('assignedTasks', this.assignedTasks.inclusionResolver);
  }
}
