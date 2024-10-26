export type TDataToBeCreated<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>
export type TDataToBeUpdated<T> = Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>