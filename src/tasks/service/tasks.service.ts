import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';
import { TaskStatus } from '../domain/task-status.enum';
import { ITaskRepository } from '../domain/task.repository';
import { Task } from '../domain/task.entity';
import { User } from 'src/auth/domain/user.entity';

@Injectable()
export class TasksService {
  constructor(private taskRepository: ITaskRepository) {}

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.taskRepository.delete(id, { user });

    if (!result) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { search, status } = filterDto;

    return this.taskRepository.getTasks(search, status, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const foundTask = await this.taskRepository.get(id, { user });

    if (!foundTask) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return foundTask;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task: Task = new Task();

    task.description = createTaskDto.description;
    task.title = createTaskDto.title;
    task.status = TaskStatus.OPEN;
    task.user = user;

    const createdTask = await this.taskRepository.create(task);
    return createdTask;
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.taskRepository.update(task);
    return task;
  }
}
