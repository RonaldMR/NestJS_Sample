import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { BaseEntity } from '../domain/base-entity';
import { IRepository } from '../domain/repository';

export abstract class AbstractRepository<T extends BaseEntity>
  implements IRepository<T>
{
  constructor(
    protected repository: Repository<T>,
    private entityName: string,
  ) {}

  async get(id: string, extraFilters: object = undefined): Promise<T> {
    const find: FindOptionsWhere<BaseEntity> = extraFilters
      ? { id, ...extraFilters }
      : { id };
    return this.repository.findOneBy(find as FindOptionsWhere<T>);
  }

  async create(entity: T): Promise<T> {
    const newTask = this.repository.create({
      ...entity,
    });

    await this.customizeNew(newTask);

    try {
      await this.repository.save(newTask);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(`${this.entityName} already exists`);
      }
      throw new InternalServerErrorException();
    }

    return newTask;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  async customizeNew(entity: T): Promise<void> {}

  async delete(id: string, extraFilters: object = undefined): Promise<boolean> {
    const find: FindOptionsWhere<BaseEntity> = extraFilters
      ? { id, ...extraFilters }
      : { id };
    const result = await this.repository.delete(find as FindOptionsWhere<T>);
    return result.affected === 1;
  }

  async update(entity: T): Promise<void> {
    await this.repository.save(entity);
  }
}
