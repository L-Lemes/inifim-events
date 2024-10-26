export interface IConfiguration {
  id: string;
  language: string;
  overallVolume: number;
  musicVolume: number;
  soundEffects: number;
  textSize: number;
  createdAt: Date;
  updatedAt: Date;
}

type TFindById<T> = (id: string) => Promise<T | null>
type TUpdate<T> = (id: string, data: Partial<T>) => Promise<T>

export interface IConfigurationRepository<T> {
  findById: TFindById<T>
  update: TUpdate<T>
}

