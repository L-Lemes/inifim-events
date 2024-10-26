import { PrismaClient } from "@prisma/client"
import { IEvent, IEventRepository, TCreate, TCreateData, TDelete, TFindById, TUpdate, TUpdateData } from "./types-event-repository.js"

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
        name: data.name,
        slogan: data.slogan,
        description: data.description,
        numberOfGuests: data.numberOfGuests,
        startDate: data.startDate,
        endDate: data.endDate,
        startTime: data.startTime,
        endTime: data.endTime,
        location: {
          connect: {
            id: data.locationId
          }
        }
      }, include: {
        location: true
      }
    });
  
    return newEvent;
  };

  findById = async(id: string): Promise<IEvent | null> => {
    const eventFound = await this.prisma.event.findUnique({where: 
      { id }, 
      include: {
        location: true,
      }
    })
    return eventFound
  }

  update = async (id: string, data: TUpdateData<IEvent>): Promise<IEvent> => {

    const { locationId, ...updateData } = data;

    const eventUpdated = await this.prisma.event.update({where: 
      { id },
      data: {
        ...updateData,
        location: locationId ? {
          connect: {
            id: locationId
          }
        } : undefined ,
      }, 
      include: {
        location: true,
      }
    })

    return eventUpdated
  }

  delete = async (id: string): Promise<IEvent> => {
    const EventDelete =  await this.prisma.event.delete({where: 
      { id },
      include: {
        location: true,
      }
    })
    return EventDelete    
  }
}