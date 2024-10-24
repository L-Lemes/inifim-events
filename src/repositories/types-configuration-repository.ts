import { IUser } from "./types-user-reposiotry.js"

export interface IConfiguration {
  id: string
  language: string
  overallVolume: number
  musicVolume: number
  soundEffects: number
  textSize: number
  createdAt?: Date
  updatedAt?: Date     
  userId?: string
  user?: IUser
}
type TFindById<T> = (id: string) => Promise<T | null>
type TUpdate<T> = (id: string, data: Partial<Omit<IConfiguration, 'userId' | 'user'>>) => Promise<T>

export interface IConfigurationRepository<T> {
  findById: TFindById<T>
  update: TUpdate<T>
}

