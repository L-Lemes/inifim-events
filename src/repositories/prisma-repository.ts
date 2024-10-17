import { BaseRepository, IBaseModel } from './repository.js'

export interface PrismaModelMethods<T extends IBaseModel> {
  create(args: { data: Omit<T, 'id' | 'createdAt' | 'updatedAt'> }): Promise<T>;
  findUnique(args: { where: { id: string } }): Promise<T | null>;
  findMany(args?: object): Promise<T[]>;
  update(args: { where: { id: string }, data: Partial<Omit<T, 'id'>> }): Promise<T>;
  delete(args: { where: { id: string } }): Promise<T>;
}

export abstract class PrismaRepository<T extends IBaseModel> extends BaseRepository<T> {
  public constructor() {
    super()
  } 

  protected abstract getModel(): PrismaModelMethods<T>

  async create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    const newEvent = await this.getModel().create({ data })
    return newEvent
  }

  async findById(id: string): Promise<T | null> {
    return this.getModel().findUnique({ where: { id } })
  }

  async findAll(args?: object): Promise<T[] | []> {
    return await this.getModel().findMany(args)
  }

  async update(id: string, data: Partial<Omit<T, 'id'>>): Promise<T> {
    return await this.getModel().update({
      where: { id },
      data,
    })
  }

  async delete(id: string): Promise<T> {
    return this.getModel().delete({ where: { id } })
  }
}