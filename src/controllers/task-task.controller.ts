import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Task,
} from '../models';
import {TaskRepository} from '../repositories';

export class TaskTaskController {
  constructor(
    @repository(TaskRepository)
    public taskRepository: TaskRepository,
  ) { }

  @get('/tasks/{id}/previous-task', {
    responses: {
      '200': {
        description: 'Task belonging to Task',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Task)},
          },
        },
      },
    },
  })
  async getPreviousTask(
    @param.path.string('id') id: typeof Task.prototype.id,
  ): Promise<Task> {
    return this.taskRepository.previousTask(id);
  }
}
