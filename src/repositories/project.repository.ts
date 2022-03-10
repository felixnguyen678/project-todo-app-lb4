import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Project, ProjectRelations, Task, User} from '../models';
import {TaskRepository} from './task.repository';
import {UserRepository} from './user.repository';

export class ProjectRepository extends DefaultCrudRepository<
  Project,
  typeof Project.prototype.id,
  ProjectRelations
> {

  public readonly tasks: HasManyRepositoryFactory<Task, typeof Project.prototype.id>;

  public readonly getCreator: BelongsToAccessor<User, typeof Project.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('TaskRepository') protected taskRepositoryGetter: Getter<TaskRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Project, dataSource);
    this.getCreator = this.createBelongsToAccessorFor('getCreator', userRepositoryGetter,);
    this.registerInclusionResolver('getCreator', this.getCreator.inclusionResolver);
    this.tasks = this.createHasManyRepositoryFactoryFor('tasks', taskRepositoryGetter,);
    this.registerInclusionResolver('tasks', this.tasks.inclusionResolver);
  }
}
