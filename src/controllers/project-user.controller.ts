import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Project,
  User,
} from '../models';
import {ProjectRepository} from '../repositories';

export class ProjectUserController {
  constructor(
    @repository(ProjectRepository)
    public projectRepository: ProjectRepository,
  ) { }

  @get('/projects/{id}/creator', {
    responses: {
      '200': {
        description: 'User belonging to Project',
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
    return this.projectRepository.getCreator(id);
  }
}
