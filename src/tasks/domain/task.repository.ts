import { User } from 'src/auth/domain/user.entity';
import { IRepository } from 'src/shared/domain/repository';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

export abstract class ITaskRepository extends IRepository<Task> {
  abstract getTasks(
    search: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task[]>;
}
