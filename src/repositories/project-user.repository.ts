import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {ProjectUser, ProjectUserRelations, Project, User} from '../models';
import {ProjectRepository} from './project.repository';
import {UserRepository} from './user.repository';

export class ProjectUserRepository extends DefaultCrudRepository<
  ProjectUser,
  typeof ProjectUser.prototype.id,
  ProjectUserRelations
> {

  public readonly getProject: BelongsToAccessor<Project, typeof ProjectUser.prototype.id>;

  public readonly getUser: BelongsToAccessor<User, typeof ProjectUser.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('ProjectRepository') protected projectRepositoryGetter: Getter<ProjectRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(ProjectUser, dataSource);
    this.getUser = this.createBelongsToAccessorFor('getUser', userRepositoryGetter,);
    this.registerInclusionResolver('getUser', this.getUser.inclusionResolver);
    this.getProject = this.createBelongsToAccessorFor('getProject', projectRepositoryGetter,);
    this.registerInclusionResolver('getProject', this.getProject.inclusionResolver);
  }
}
