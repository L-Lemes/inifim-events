import { PrismaClient } from "@prisma/client"
import { IUser, IUserRepository, TCreate, TCreateData, TFindById, TUpdate, TUpdateData, TDelete } from "./types-user-reposiotry.js"

export abstract class BaseUserRepository<T> implements IUserRepository<T> {
 abstract create: TCreate<T>
 abstract findById: TFindById<T>
 abstract update: TUpdate<T>
 abstract delete: TDelete<T>
} 

export class UserRepository extends BaseUserRepository<IUser> {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    super()
    this.prisma = prisma
  }

  create = async (data: TCreateData<IUser>): Promise<IUser> => {
    const newEvent = await this.prisma.user.create({
      data: {
        name: data.name,        
        email: data.email,      
        password: data.password, 
        configuration: {
          create: {
            language: 'pt-br',
            overallVolume: 80,
            musicVolume: 80,
            soundEffects: 80,
            textSize: 100,
          }
        }
      },
      include: { 
        configuration: true,
      }
    })

    return  newEvent
  }

  findById = async(id: string): Promise<IUser | null> => {
    const eventFound = await this.prisma.user.findUnique({where: 
      { 
        id 
      },
      include: {
        configuration: true,
      }
    })
    return eventFound
  }

  update = async (id: string, data: TUpdateData<IUser>): Promise<IUser> => {
    const eventUpdated = await this.prisma.user.update({
      where: { 
        id 
      }, 
      data,
      include: {
        configuration: true,
      }
    })

    return eventUpdated
  }

  delete = async (id: string): Promise<IUser> => {
    const userDelete =  await this.prisma.user.delete({where: 
      { 
        id 
      },
      include: {
        configuration: true,
      }
    })
    return userDelete    
  }
}