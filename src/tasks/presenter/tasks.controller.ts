import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from '../dto/update-task-status.dto';
import { Task } from '../domain/task.entity';
import { TasksService } from '../service/tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/domain/user.entity';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Delete('/:id')
  async deleteTask(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return await this.tasksService.deleteTask(id, user);
  }

  @Get()
  async getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return await this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  async getTaskById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Task> {
    return await this.tasksService.getTaskById(id, user);
  }

  @Post()
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return await this.tasksService.createTask(createTaskDto, user);
  }

  @Patch('/:id/status')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return await this.tasksService.updateTaskStatus(
      id,
      updateTaskStatusDto.status,
      user,
    );
  }
}
