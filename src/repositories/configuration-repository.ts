import { PrismaClient } from "@prisma/client"
import { IConfiguration, IConfigurationRepository } from "./types-configuration-repository.js"

export abstract class BaseConfigurationRepository<T> implements IConfigurationRepository<T>  {
  abstract findById: (id: string) => Promise<T | null>
  abstract update: (id: string, data: Partial<Omit<IConfiguration, 'userId' | 'user'>>) => Promise<T>
}

export class ConfigurationRepository extends BaseConfigurationRepository<IConfiguration> {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    super()
    this.prisma = prisma
  }

  findById = async(id: string): Promise<IConfiguration | null> => {
    const configurationFound = await this.prisma.configuration.findUnique({
      where: { 
        id
      },
      include: {
        user: true
      }
    }) 

    return configurationFound
  }

  update = async (id: string, data: Partial<IConfiguration>): Promise<IConfiguration> => {
    const eventUpdated = await this.prisma.configuration.update({
      where: { 
        id 
      }, 
      data,
      include: {
        user: true
      }

    })

    return eventUpdated
  }


}