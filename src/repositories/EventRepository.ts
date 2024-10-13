import { PrismaClient } from "@prisma/client"
import { ModelRepository } from "./ModelRepository.js"
import { prisma } from "../prisma.js"

export interface IEvent { 
  id: string
  name: string
  numberOfGuests: number
  local: string
  date: Date
  startTime: Date
  endTime: Date
  createdAt: Date
  updatedAt: Date 
}

export class EventRepository extends ModelRepository<IEvent> {
  private prisma: PrismaClient = prisma
  protected getModel() {
    return this.prisma.event
  }
}