import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {User, UserRelations, Task, Project} from '../models';
import {TaskRepository} from './task.repository';
import {ProjectRepository} from './project.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly ownedTasks: HasManyRepositoryFactory<Task, typeof User.prototype.id>;

  public readonly createdTasks: HasManyRepositoryFactory<Task, typeof User.prototype.id>;

  public readonly createdProjects: HasManyRepositoryFactory<Project, typeof User.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('TaskRepository') protected taskRepositoryGetter: Getter<TaskRepository>, @repository.getter('ProjectRepository') protected projectRepositoryGetter: Getter<ProjectRepository>,
  ) {
    super(User, dataSource);
    this.createdProjects = this.createHasManyRepositoryFactoryFor('createdProjects', projectRepositoryGetter,);
    this.registerInclusionResolver('createdProjects', this.createdProjects.inclusionResolver);
    this.createdTasks = this.createHasManyRepositoryFactoryFor('createdTasks', taskRepositoryGetter,);
    this.registerInclusionResolver('createdTasks', this.createdTasks.inclusionResolver);
    this.ownedTasks = this.createHasManyRepositoryFactoryFor('ownedTasks', taskRepositoryGetter,);
    this.registerInclusionResolver('ownedTasks', this.ownedTasks.inclusionResolver);
  }
}
