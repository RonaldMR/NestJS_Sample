import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashManager } from 'src/shared/infrastructure/hash-generator';
import { AbstractRepository } from 'src/shared/infrastructure/repository';
import { Repository } from 'typeorm';
import { User } from '../domain/user.entity';
import { IUserRepository } from '../domain/user.repository';

@Injectable()
export class UserRepository
  extends AbstractRepository<User>
  implements IUserRepository
{
  constructor(
    @InjectRepository(User) repository: Repository<User>,
    private hashManager: HashManager,
  ) {
    super(repository, 'User');
  }

  async getUser(userName: string, password?: string): Promise<User> {
    const user = await this.repository.findOneBy({ userName });

    if (!user) {
      return;
    }

    if (!password) {
      return user;
    }

    const passwordMatches = await this.hashManager.compare(
      password,
      user.password,
    );

    return passwordMatches ? user : undefined;
  }

  async customizeNew(entity: User): Promise<void> {
    const hashedPassword = await this.hashManager.generateHash(entity.password);

    entity.password = hashedPassword;
  }
}
