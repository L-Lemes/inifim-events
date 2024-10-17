import { PrismaClient } from "@prisma/client"
import { PrismaRepository } from "./prisma-repository.js"
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
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    super();
    this.prisma = prisma;
  }
  
  getModel() {
    return this.prisma.user
  }
}