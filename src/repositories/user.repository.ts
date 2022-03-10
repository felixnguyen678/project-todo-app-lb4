import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {User, UserRelations, Task, Project, ProjectUser} from '../models';
import {TaskRepository} from './task.repository';
import {ProjectRepository} from './project.repository';
import {ProjectUserRepository} from './project-user.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly assignedTasks: HasManyRepositoryFactory<Task, typeof User.prototype.id>;

  public readonly createdTasks: HasManyRepositoryFactory<Task, typeof User.prototype.id>;

  public readonly createdProjects: HasManyRepositoryFactory<Project, typeof User.prototype.id>;

  public readonly projectUsers: HasManyRepositoryFactory<ProjectUser, typeof User.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('TaskRepository') protected taskRepositoryGetter: Getter<TaskRepository>, @repository.getter('ProjectRepository') protected projectRepositoryGetter: Getter<ProjectRepository>, @repository.getter('ProjectUserRepository') protected projectUserRepositoryGetter: Getter<ProjectUserRepository>,
  ) {
    super(User, dataSource);
    this.projectUsers = this.createHasManyRepositoryFactoryFor('projectUsers', projectUserRepositoryGetter,);
    this.registerInclusionResolver('projectUsers', this.projectUsers.inclusionResolver);
    this.createdProjects = this.createHasManyRepositoryFactoryFor('createdProjects', projectRepositoryGetter,);
    this.registerInclusionResolver('createdProjects', this.createdProjects.inclusionResolver);
    this.createdTasks = this.createHasManyRepositoryFactoryFor('createdTasks', taskRepositoryGetter,);
    this.registerInclusionResolver('createdTasks', this.createdTasks.inclusionResolver);
    this.assignedTasks = this.createHasManyRepositoryFactoryFor('assignedTasks', taskRepositoryGetter,);
    this.registerInclusionResolver('assignedTasks', this.assignedTasks.inclusionResolver);
  }
}
