import { TDataToBeCreated, TDataToBeUpdated } from "../types-base.js"

export interface ILocation {
  id:          string  
  name:        string
  publicPlace: string
  number:      number
  cep:         number
  isPublic:    boolean
  createdAt:  Date
  updatedAt:  Date
}

type TCreate<T> = (data: TDataToBeCreated<T>) => Promise<T>
type TFindById<T> = (id: string) => Promise<T | null>
type TUpdate<T> = (id: string, data: TDataToBeUpdated<T>) => Promise<T>


export interface ILocationRepository<T> {
  create: TCreate<T>
  findById: TFindById<T>
  update: TUpdate<T>
  delete: (id: string) => Promise<T>
}