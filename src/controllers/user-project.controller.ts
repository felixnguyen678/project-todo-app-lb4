import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  Project,
} from '../models';
import {UserRepository} from '../repositories';

export class UserProjectController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/created-projects', {
    responses: {
      '200': {
        description: 'Array of User has many Project',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Project)},
          },
        },
      },
    },
  })
  async findCreatedProject(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Project>,
  ): Promise<Project[]> {
    return this.userRepository.createdProjects(id).find(filter);
  }

  @post('/users/{id}/created-projects', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Project)}},
      },
    },
  })
  async createCreatedProject(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Project, {
            title: 'NewProjectInUser',
            exclude: ['id'],
            optional: ['creator']
          }),
        },
      },
    }) project: Omit<Project, 'id'>,
  ): Promise<Project> {
    return this.userRepository.createdProjects(id).create(project);
  }

  @patch('/users/{id}/created-projects', {
    responses: {
      '200': {
        description: 'User.Project PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patchCreatedProject(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Project, {partial: true}),
        },
      },
    })
    project: Partial<Project>,
    @param.query.object('where', getWhereSchemaFor(Project)) where?: Where<Project>,
  ): Promise<Count> {
    return this.userRepository.createdProjects(id).patch(project, where);
  }

  @del('/users/{id}/created-projects', {
    responses: {
      '200': {
        description: 'User.Project DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async deleteCreatedProject(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Project)) where?: Where<Project>,
  ): Promise<Count> {
    return this.userRepository.createdProjects(id).delete(where);
  }
}