import { Exclude } from 'class-transformer';
import { User } from 'src/auth/domain/user.entity';
import { BaseEntity } from 'src/shared/domain/base-entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Entity()
export class Task extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne(() => User, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
