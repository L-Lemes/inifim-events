
import { IEvent } from "./types-event-repository.js"
import { IUser } from "./types-user-reposiotry.js"

export interface ILocation {
  id:          string  
  name:        string
  publicPlace: string
  number:      number
  cep:         number
  createdAt?: Date
  updatedAt?: Date  
  event?:       IEvent[] | null
  user?:        IUser | null
  userId?:      string | null
}

export type TCreateDataLoc<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>