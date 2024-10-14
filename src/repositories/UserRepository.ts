import { PrismaClient } from "@prisma/client"
import { PrismaRepository } from "./PrismaRepository.js"
import { prisma } from "../prisma.js"

export interface IUser { 
  id: string
  fullName: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date 
}

export class UserRepository extends PrismaRepository<IUser> {
  private prisma: PrismaClient = prisma
  
  protected getModel() {
    return this.prisma.user
  }
}