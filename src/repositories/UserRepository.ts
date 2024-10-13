import { PrismaClient } from "@prisma/client"
import { ModelRepository } from "./ModelRepository.js"
import { prisma } from "../prisma.js"

export interface IUser { 
  id: string
  fullName: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date 
}

export class UserRepository extends ModelRepository<IUser> {
  private prisma: PrismaClient = prisma
  protected getModel() {
    return this.prisma.user
  }
}