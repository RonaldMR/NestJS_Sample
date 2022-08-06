import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './domain/task.entity';
import { TaskRepository } from './infrastructure/task.repository';
import { ITaskRepository } from './domain/task.repository';
import { TasksController } from './presenter/tasks.controller';
import { TasksService } from './service/tasks.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule],
  controllers: [TasksController],
  providers: [
    TasksService,
    {
      provide: ITaskRepository,
      useClass: TaskRepository,
    },
  ],
})
export class TasksModule {}
