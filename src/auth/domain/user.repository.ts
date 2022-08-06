import { IRepository } from 'src/shared/domain/repository';
import { User } from './user.entity';

export abstract class IUserRepository extends IRepository<User> {
  abstract getUser(userName: string, password?: string): Promise<User>;
}
