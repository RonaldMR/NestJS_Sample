import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from 'src/shared/infrastructure/repository';
import { Repository } from 'typeorm';
import { TaskStatus } from '../domain/task-status.enum';
import { ITaskRepository } from '../domain/task.repository';
import { Task } from '../domain/task.entity';
import { User } from 'src/auth/domain/user.entity';

@Injectable()
export class TaskRepository
  extends AbstractRepository<Task>
  implements ITaskRepository
{
  constructor(@InjectRepository(Task) repository: Repository<Task>) {
    super(repository, 'Task');
  }

  async getTasks(
    search: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task[]> {
    const query = this.repository.createQueryBuilder('task');

    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) or LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }
}
