import { PrismaClient } from "@prisma/client"
import { PrismaRepository } from "./prisma-repository.js"
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

export class EventRepository extends PrismaRepository<IEvent> {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    super();
    this.prisma = prisma;
  }
  
  getModel() {
    return this.prisma.event
  }
}