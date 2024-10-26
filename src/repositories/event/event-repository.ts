import { PrismaClient } from "@prisma/client"
import { IEvent, IEventRepository } from "./types-event-repository.js"
import { TDataToBeCreated, TDataToBeUpdated } from "../types-base.js"
import { connect } from "http2"

export abstract class BaseEventRepository<T> implements IEventRepository<T> {
 abstract create: (data: TDataToBeCreated<T>) => Promise<T>
 abstract findById: (id: string) => Promise<T | null>
 abstract update: (id: string, data: TDataToBeUpdated<T>) => Promise<T>
 abstract delete: (id: string) => Promise<T>
} 
export class EventRepository extends BaseEventRepository<IEvent> {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    super()
    this.prisma = prisma
  }

  create = async (data: TDataToBeCreated<IEvent>): Promise<IEvent> => {
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
        location: data.locationId ? {
          connect: {
            id: data.locationId 
          }
        } : data.location ? {
          connectOrCreate: {
            where: {
              publicPlace_number_cep_isPublic: {
                publicPlace: data.location?.publicPlace,
                cep: data.location?.cep,
                number: data.location.number,
                isPublic: data.location.isPublic,
              }
            }, create: {
              ...data.location
            }
          }
        }: undefined,
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

  update = async (id: string, data: TDataToBeUpdated<IEvent>): Promise<IEvent> => {

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