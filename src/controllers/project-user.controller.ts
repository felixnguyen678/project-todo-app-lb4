import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Project, ProjectUser, Task, User} from '../models';
import {ProjectRepository, ProjectUserRepository, UserRepository} from '../repositories';

export class ProjectUserController {

  constructor(
    @repository(ProjectRepository)
    public projectRepository: ProjectRepository,
    @repository(ProjectUserRepository)
    public projectUserRepository: ProjectUserRepository,
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  // @post('/project-users')
  // @response(200, {
  //   description: 'ProjectUser model instance',
  //   content: {'application/json': {schema: getModelSchemaRef(ProjectUser)}},
  // })
  // async create(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(ProjectUser, {
  //           title: 'NewProjectUser',
  //           exclude: ['id'],
  //         }),
  //       },
  //     },
  //   })
  //   projectUser: Omit<ProjectUser, 'id'>,
  // ): Promise<ProjectUser> {
  //   return this.projectUserRepository.create(projectUser);
  // }
  //
  // @get('/project-users/count')
  // @response(200, {
  //   description: 'ProjectUser model count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async count(
  //   @param.where(ProjectUser) where?: Where<ProjectUser>,
  // ): Promise<Count> {
  //   return this.projectUserRepository.count(where);
  // }
  //
  // @get('/project-users')
  // @response(200, {
  //   description: 'Array of ProjectUser model instances',
  //   content: {
  //     'application/json': {
  //       schema: {
  //         type: 'array',
  //         items: getModelSchemaRef(ProjectUser, {includeRelations: true}),
  //       },
  //     },
  //   },
  // })
  // async find(
  //   @param.filter(ProjectUser) filter?: Filter<ProjectUser>,
  // ): Promise<ProjectUser[]> {
  //   return this.projectUserRepository.find(filter);
  // }
  //
  // @patch('/project-users')
  // @response(200, {
  //   description: 'ProjectUser PATCH success count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async updateAll(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(ProjectUser, {partial: true}),
  //       },
  //     },
  //   })
  //   projectUser: ProjectUser,
  //   @param.where(ProjectUser) where?: Where<ProjectUser>,
  // ): Promise<Count> {
  //   return this.projectUserRepository.updateAll(projectUser, where);
  // }
  //
  // @get('/project-users/{id}')
  // @response(200, {
  //   description: 'ProjectUser model instance',
  //   content: {
  //     'application/json': {
  //       schema: getModelSchemaRef(ProjectUser, {includeRelations: true}),
  //     },
  //   },
  // })
  // async findById(
  //   @param.path.string('id') id: string,
  //   @param.filter(ProjectUser, {exclude: 'where'}) filter?: FilterExcludingWhere<ProjectUser>
  // ): Promise<ProjectUser> {
  //   return this.projectUserRepository.findById(id, filter);
  // }
  //
  // @patch('/project-users/{id}')
  // @response(204, {
  //   description: 'ProjectUser PATCH success',
  // })
  // async updateById(
  //   @param.path.string('id') id: string,
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(ProjectUser, {partial: true}),
  //       },
  //     },
  //   })
  //   projectUser: ProjectUser,
  // ): Promise<void> {
  //   await this.projectUserRepository.updateById(id, projectUser);
  // }
  //
  // @put('/project-users/{id}')
  // @response(204, {
  //   description: 'ProjectUser PUT success',
  // })
  // async replaceById(
  //   @param.path.string('id') id: string,
  //   @requestBody() projectUser: ProjectUser,
  // ): Promise<void> {
  //   await this.projectUserRepository.replaceById(id, projectUser);
  // }
  //
  // @del('/project-users/{id}')
  // @response(204, {
  //   description: 'ProjectUser DELETE success',
  // })
  // async deleteById(@param.path.string('id') id: string): Promise<void> {
  //   await this.projectUserRepository.deleteById(id);
  // }

  @get('/projects/{id}/creator', {
    responses: {
      '200': {
        description: 'Creator belonging to Project',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getCreator(
    @param.path.string('id') id: typeof Project.prototype.id,
  ): Promise<User> {
    return this.projectRepository.creator(id);
  }

  @get('/projects/{id}/members', {
    responses: {
      '200': {
        description: 'Members of Project',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getMembers(
    @param.path.string('id') id: typeof Project.prototype.id,
  ): Promise<User[]> {
    try {
      const projectUsers = await this.projectRepository.projectUsers(id).find();
      const members =  await Promise.all(projectUsers.map(async projectUser => {
        return await this.userRepository.findById(projectUser.userId);
      }));
      return members;
    } catch (e){
      throw new Error('Not found');

    }
  }

  @post('/projects/{id}/members')
  @response(200, {
    description: 'ProjectUser model instance',
    content: {'application/json': {schema: getModelSchemaRef(ProjectUser)}},
  })
  async addMember(
    @param.path.string('id') id: typeof Project.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewMemberInProject',
            exclude: ['password', 'updatedAt', "createdAt"],
            optional: ["username", "fullName", "status", "role"]
          }),
        },
      },
    }) user: Partial<User>,
  ): Promise<ProjectUser> {
    const projectUser = {
      userId: user.id,
      projectId: id
    }
    console.log(projectUser);
    return this.projectUserRepository.create(projectUser);
  }

  @del('/project/{id}/members')
  @response(204, {
    description: 'ProjectUser DELETE success',
  })
  async deleteMemberOfProject(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'DeleteMemberInProject',
            exclude: ['password', 'updatedAt', "createdAt"],
            optional: ["username", "fullName", "status", "role"]
          }),
        },
      },
    }) user: Partial<User>,
  ): Promise<void> {
    try {
      const projectUser = await this.projectUserRepository.findOne({where: {userId: user.id, projectId: id}});
      if(!projectUser) return;
      return this.projectUserRepository.delete(projectUser);
    } catch (e){
      throw new Error(e);
    }
  }
}
