import { TDataToBeCreated, TDataToBeUpdated } from "../types-base.js"
import { ILocation } from "../location/types-location-repository.js"

export interface IEvent  { 
  id: string 
  name: string
  slogan: string
  description: string
  numberOfGuests: number 
  startDate: Date
  endDate: Date
  startTime: Date
  endTime: Date
  createdAt: Date 
  updatedAt: Date 
  locationId: string
  location?: ILocation | null
}


type TCreate<T> = (data: TDataToBeCreated<T>) => Promise<T>
type TFindById<T> = (id: string) => Promise<T | null>
type TUpdate<T> = (id: string, data: TDataToBeUpdated<T>) => Promise<T>
type TDelete<T> = (id: string) => Promise<T>

export interface IEventRepository<T> {
  create: TCreate<T> 
  findById: TFindById<T>
  update: TUpdate<T>
  delete: TDelete<T>
}
