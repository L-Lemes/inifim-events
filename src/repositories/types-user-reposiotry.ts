export interface IUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  password: string;
  configurationId: string;
}

export type TCreateData<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>
export type TUpdateData<T> = Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt' >>

export type TCreate<T> = (data: TCreateData<T>) => Promise<T>
export type TFindById<T> = (id: string) => Promise<T | null>
export type TUpdate<T> = (id: string, data: TUpdateData<T>) => Promise<T>
export type TDelete<T> = (id: string) => Promise<T>

export interface IUserRepository<T> {
  create: TCreate<T>
  findById: TFindById<T>
  update: TUpdate<T>
  delete: TDelete<T>
}