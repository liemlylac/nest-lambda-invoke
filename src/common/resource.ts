import { NotFoundException } from '@nestjs/common';
import { DeepPartial } from 'typeorm/common/DeepPartial';

export abstract class Resource<Entity> {
  protected constructor(public entityName: string) {}

  abstract count(options): Promise<number>;

  abstract find(options): Promise<Entity[]>;

  abstract findOne(options): Promise<Entity>;

  abstract preload(entityLike: DeepPartial<Entity>): Promise<Entity>;

  abstract create(entityLike: DeepPartial<Entity>): Entity;

  abstract save(
    data: DeepPartial<Entity> | DeepPartial<Entity>[],
    options?,
  ): Promise<any>;

  abstract insert(entity: DeepPartial<Entity | Entity[]>): Promise<any>;

  abstract update(id: number | string, data: Partial<Entity>): Promise<any>;

  abstract delete(id: number | string): Promise<any>;

  async checkEntity(options) {
    const count = await this.count(options);
    if (count < 1) {
      throw new NotFoundException(`${this.entityName} not found`);
    }
  }

  async findOneOrFail(options): Promise<Entity> {
    const entity: Entity = await this.findOne(options);
    if (!entity) {
      throw new NotFoundException(`${this.entityName} not found`);
    }
    return entity;
  }
}
