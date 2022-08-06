import { BaseEntity } from './base-entity';

export abstract class IRepository<T extends BaseEntity> {
  abstract get(id: string, extraFilters?: object): Promise<T>;

  abstract create(entity: T): Promise<T>;

  abstract delete(id: string, extraFilters?: object): Promise<boolean>;

  abstract update(entity: T): Promise<void>;
}
