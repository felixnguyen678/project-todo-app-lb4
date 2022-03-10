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
  Task,
} from '../models';
import {UserRepository} from '../repositories';

export class UserTaskController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/assigned-tasks', {
    responses: {
      '200': {
        description: 'Array of User has many Task',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Task)},
          },
        },
      },
    },
  })
  async findAssignedTasks(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Task>,
  ): Promise<Task[]> {
    return this.userRepository.assignedTasks(id).find(filter);
  }

  @post('/users/{id}/assigned-tasks', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Task)}},
      },
    },
  })
  async createAssignedTasks(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Task, {
            title: 'NewTaskInUser',
            exclude: ['id'],
            optional: ['owner']
          }),
        },
      },
    }) task: Omit<Task, 'id'>,
  ): Promise<Task> {
    return this.userRepository.assignedTasks(id).create(task);
  }

  @patch('/users/{id}/assigned-tasks', {
    responses: {
      '200': {
        description: 'User.Task PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patchAssignedTasks(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Task, {partial: true}),
        },
      },
    })
    task: Partial<Task>,
    @param.query.object('where', getWhereSchemaFor(Task)) where?: Where<Task>,
  ): Promise<Count> {
    return this.userRepository.assignedTasks(id).patch(task, where);
  }

  @del('/users/{id}/assigned-tasks', {
    responses: {
      '200': {
        description: 'User.Task DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async deleteAssignedTasks(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Task)) where?: Where<Task>,
  ): Promise<Count> {
    return this.userRepository.assignedTasks(id).delete(where);
  }

  @get('/users/{id}/created-tasks', {
    responses: {
      '200': {
        description: 'Array of User has many Task',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Task)},
          },
        },
      },
    },
  })
  async findCreatedTasks(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Task>,
  ): Promise<Task[]> {
    return this.userRepository.createdTasks(id).find(filter);
  }

  @post('/users/{id}/created-tasks', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Task)}},
      },
    },
  })
  async createCreatedTasks(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Task, {
            title: 'NewTaskInUser',
            exclude: ['id'],
            optional: ['owner']
          }),
        },
      },
    }) task: Omit<Task, 'id'>,
  ): Promise<Task> {
    return this.userRepository.createdTasks(id).create(task);
  }

  @patch('/users/{id}/created-tasks', {
    responses: {
      '200': {
        description: 'User.Task PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patchCreatedTasks(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Task, {partial: true}),
        },
      },
    })
      task: Partial<Task>,
    @param.query.object('where', getWhereSchemaFor(Task)) where?: Where<Task>,
  ): Promise<Count> {
    return this.userRepository.createdTasks(id).patch(task, where);
  }

  @del('/users/{id}/created-tasks', {
    responses: {
      '200': {
        description: 'User.Task DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async deleteCreatedTasks(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Task)) where?: Where<Task>,
  ): Promise<Count> {
    return this.userRepository.createdTasks(id).delete(where);
  }
}
