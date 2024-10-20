import { IConfiguration } from "./types-configuration-repository.js"
import { IEvent } from "./types-event-repository.js"
import { ILocation } from "./types-location-repository.js"

export interface IUser {
  id:                  string         
  name:                string
  email:               string
  password:            string
  createdAt:           Date       
  updatedAt:           Date       
  managedEvents?:       IEvent[]        
  eventsIWasInvitedTo?: IEvent[]
  configuration?:       IConfiguration | null
  location?:            ILocation[]
}

export type TCreateData<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt' | 'managedEvents' | 'eventsIWasInvitedTo' | 'location'>
export type TUpdateData<T> = Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt' | 'configuration' | 'managedEvents' | 'eventsIWasInvitedTo' | 'location'>>

export type TCreate<T> = (data: TCreateData<T>) => Promise<T>
export type TFindById<T> = (id: string) => Promise<T | null>
export type TUpdate<T> = (id: string, data: TUpdateData<T>) => Promise<T>
export type TDelete<T> = (id: string) => Promise<T>

export interface IUserRepository<T> {
  create: TCreate<T>
  findById: TFindById<T>
  update: TUpdate<T>
  delete: TDelete<T>
  //Possivel att com FindMany, ( buscar usuarios para convidar via app )
}
