
import { IEvent } from "./types-event-repository.js"
import { IUser } from "./types-user-reposiotry.js"

export interface ILocation {
  id:          string  
  name:        string
  publicPlace: string
  number:      number
  cep:         number
  event?:       IEvent[] | null
  user?:        IUser | null
  userId?:      string | null
}
