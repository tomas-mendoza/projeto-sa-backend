export interface IBaseRepository<T> {
  create(entity: T): Promise<T>;
  update(id: number): Promise<T>;
  delete(id: number): Promise<void>;
  find(): Promise<T[]>;
  findOne(id: number): Promise<T>;
}

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  async create(entity : T): Promise<T> {
    throw new Error("Method not implemented.");
  }

  async update(id: number, updatedEntity: T): Promise<T> {
    throw new Error("Method not implemented.");
  }

  async delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async find(): Promise<T[]> {
    throw new Error("Method not implemented.");
  }

  async findOne(id: number): Promise<T> {
    throw new Error("Method not implemented.");
  }
}
