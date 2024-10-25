import { ILocation } from "./types-location-repository.js"
import { IUser } from "./types-user-reposiotry.js"

export interface IEvent { 
  id: string 
  name: string
  slogan: string
  description: string
  numberOfGuests:  number 
  startDate: Date
  endDate: Date
  startTime: Date
  endTime: Date
  createdAt: Date 
  updatedAt: Date 
  managerId: string
  managedBy: IUser     
  locationId: string
  location: ILocation
  guests: IUser[]
}

export type TCreateData<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt' | 'guests'>

export type TUpdateData<T> = Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt' | 'managerId' | 'managedBy' | 'location'>>

export type TCreate<T> = (data: TCreateData<T>) => Promise<T>
export type TFindById<T> = (id: string) => Promise<T | null>
export type TFindByManager<T> = (managerId: string) => Promise<T | null>
export type TUpdate<T> = (id: string, data: TUpdateData<T>) => Promise<T>
export type TDelete<T> = (id: string) => Promise<T>

export interface IEventRepository<T> {
  create: TCreate<T> 
  findById: TFindById<T>
  findByManager: TFindByManager<T>
  update: TUpdate<T>
  delete: TDelete<T>
}
