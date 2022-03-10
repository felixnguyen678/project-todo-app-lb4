import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Task, TaskRelations, User, Project} from '../models';
import {UserRepository} from './user.repository';
import {ProjectRepository} from './project.repository';

export class TaskRepository extends DefaultCrudRepository<
  Task,
  typeof Task.prototype.id,
  TaskRelations
> {

  public readonly getOwner: BelongsToAccessor<User, typeof Task.prototype.id>;

  public readonly getCreator: BelongsToAccessor<User, typeof Task.prototype.id>;

  public readonly getPreviousTask: BelongsToAccessor<Task, typeof Task.prototype.id>;

  public readonly getProject: BelongsToAccessor<Project, typeof Task.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('TaskRepository') protected taskRepositoryGetter: Getter<TaskRepository>, @repository.getter('ProjectRepository') protected projectRepositoryGetter: Getter<ProjectRepository>,
  ) {
    super(Task, dataSource);
    this.getProject = this.createBelongsToAccessorFor('getProject', projectRepositoryGetter,);
    this.registerInclusionResolver('getProject', this.getProject.inclusionResolver);
    this.getPreviousTask = this.createBelongsToAccessorFor('getPreviousTask', taskRepositoryGetter,);
    this.registerInclusionResolver('getPreviousTask', this.getPreviousTask.inclusionResolver);
    this.getCreator = this.createBelongsToAccessorFor('getCreator', userRepositoryGetter,);
    this.registerInclusionResolver('getCreator', this.getCreator.inclusionResolver);
    this.getOwner = this.createBelongsToAccessorFor('getOwner', userRepositoryGetter,);
    this.registerInclusionResolver('getOwner', this.getOwner.inclusionResolver);
  }
}
