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

export interface IConfigurationRepository<T> {
  findById: (id: string) => Promise<T | null>
  update: (id: string, data: Partial<Omit<IConfiguration, 'userId' | 'user'>>) => Promise<T>
}

