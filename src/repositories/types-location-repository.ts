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

export type TCreateDataLocation<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>