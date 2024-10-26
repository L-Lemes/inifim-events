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
}

export type TCreateData<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>

export type TUpdateData<T> = Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt' >>

export type TCreate<T> = (data: TCreateData<T>) => Promise<T>
export type TFindById<T> = (id: string) => Promise<T | null>
export type TUpdate<T> = (id: string, data: TUpdateData<T>) => Promise<T>
export type TDelete<T> = (id: string) => Promise<T>

export interface IEventRepository<T> {
  create: TCreate<T> 
  findById: TFindById<T>
  update: TUpdate<T>
  delete: TDelete<T>
}
