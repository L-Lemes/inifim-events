import { TDataToBeCreated, TDataToBeUpdated } from "../types-base.js";

export interface IUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  password: string;
  configurationId: string;
}

type TCreate<T> = (data: TDataToBeCreated<T>) => Promise<T>
type TFindById<T> = (id: string) => Promise<T | null>
type TFindByEmail<T> = (email: string) => Promise<T | null>
type TUpdate<T> = (id: string, data: TDataToBeUpdated<T>) => Promise<T>
type TDelete<T> = (id: string) => Promise<T>

export interface IUserRepository<T> {
  create: TCreate<T>
  findById: TFindById<T>
  update: TUpdate<T>
  delete: TDelete<T>
  findByEmail: TFindByEmail<T>
}