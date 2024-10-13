export interface IBaseModel {
  id: string
  [key: string]: any
}

interface IRepositoryBase<T extends IBaseModel> {
  create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>
  findById(id: string): Promise<T | null>
  findAll(): Promise<T[]>
  update(id: string, data: Partial<Omit<T, 'id'>>): Promise<T>
  delete(id: string): Promise<T>
}

export abstract class AbstractRepository<T extends IBaseModel> implements IRepositoryBase<T> {
  abstract create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>
  abstract findById(id: string): Promise<T | null>
  abstract findAll(): Promise<T[]>
  abstract update(id: string, data: Partial<Omit<T, 'id'>>): Promise<T>
  abstract delete(id: string): Promise<T>
}