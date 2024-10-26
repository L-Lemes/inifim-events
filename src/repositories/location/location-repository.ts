import { PrismaClient } from "@prisma/client";
import { ILocation, ILocationRepository } from "./types-location-repository.js";
import { TDataToBeCreated, TDataToBeUpdated } from "../types-base.js";

export abstract class BaseLocationRepository<T> implements ILocationRepository<T>{
  abstract create: (data: TDataToBeCreated<T>) => Promise<T>;
  abstract findById: (id: string) => Promise<T | null>;
  abstract update: (id: string, data: TDataToBeUpdated<T>) => Promise<T>;
  abstract delete: (id: string) => Promise<T>;
}

export class LocationRepository extends BaseLocationRepository<ILocation> {
  constructor(private prisma: PrismaClient) {
    super()
  }

  create = async (data: TDataToBeCreated<ILocation>): Promise<ILocation> => {
    const newLocation = this.prisma.location.create({data})
    return newLocation
  }
  findById = async (id: string): Promise<ILocation | null> => { 
    const locationFound = this.prisma.location.findUnique({where: { id } })
    return locationFound
  }
  update = async (id: string, data: TDataToBeUpdated<ILocation>): Promise<ILocation> => {
    const locationUpdated = this.prisma.location.update({where: { id }, data })
    return locationUpdated
  }
  delete = async (id: string): Promise<ILocation> => {
    const locationDeleted = this.prisma.location.delete({where: { id } })
    return locationDeleted
  }
}