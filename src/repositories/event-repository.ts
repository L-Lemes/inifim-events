import { PrismaClient } from "@prisma/client"
import { IUser, IUserRepository, TCreate, TCreateData, TFindById, TUpdate, TUpdateData, TDelete } from "./types-user-reposiotry.js"
import { IEvent } from "./types-event-repository.js"

export abstract class BaseEventRepository<T> implements IEventRepository<T> {
 abstract create: TCreate<T>
 abstract findById: TFindById<T>
 abstract update: TUpdate<T>
 abstract delete: TDelete<T>
} 

export class EventRepository extends BaseEventRepository<IEvent> {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    super()
    this.prisma = prisma
  }

  create = async (data: TCreateData<IEvent>): Promise<IEvent> => {
    const newEvent = await this.prisma.event.create({
      data: {
        name: 'fé',        
        email: 'pqp',      
        password: 'vsfff', 
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

  findById = async(id: string): Promise<IEvent | null> => {
    const eventFound = await this.prisma.event.findUnique({where: 
      { 
        id 
      },
      include: {
        eventsIWasInvitedTo: true,
        location: true,
        managedEvents: true,
        configuration: true
      }
    })
    return eventFound
  }

  update = async (id: string, data: TUpdateData<IEvent>): Promise<IEvent> => {
    const eventUpdated = await this.prisma.event.update({
      where: { 
        id 
      }, 
      data,
      include: {
        eventsIWasInvitedTo: true,
        location: true,
        managedEvents: true,
        configuration: true
      } 
    })

    return eventUpdated
  }

  delete = async (id: string): Promise<IEvent> => {
    const EventDelete =  await this.prisma.event.delete({where: 
      { 
        id 
      },
      include: {
        eventsIWasInvitedTo: true,
        location: true,
        managedEvents: true,
        configuration: true
      }
    })
    return EventDelete    
  }
}