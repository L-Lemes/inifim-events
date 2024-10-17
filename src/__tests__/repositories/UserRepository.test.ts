import { describe, it, expect, expectTypeOf } from "vitest"
import { PrismaModelMethods, PrismaRepository } from "../../repositories/prisma-repository.js"
import { IUser } from "../../repositories/user-repository.js"

describe("test users repository methods", () => {
  const usersData = [
    {
      id: 'id-test-1',
      fullName: 'name-1',
      password: 'senha-1',
      email: 'email-1',
      createdAt: new Date('2024-10-12T20:47:57.374Z'),
      updatedAt: new Date('2024-10-12T20:47:57.374Z'),
    },
    {
      id: 'id-test-2',
      fullName: 'name-2',
      password: 'senha-2',
      email: 'email-2',
      createdAt: new Date('2024-10-12T20:47:57.374Z'),
      updatedAt: new Date('2024-10-12T20:47:57.374Z'),
    }
  ]
  
  class MockPrismaDotUser implements PrismaModelMethods<IUser> {
    async create(args: {data: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'> }): Promise<IUser> {
      const {data} = args
  
      const user = {
        id: 'id-test-3',
        ...data,
        createdAt: new Date('2024-10-12T20:47:57.374Z'),
        updatedAt: new Date('2024-10-12T20:47:57.374Z'),
      };
  
      usersData.push(user)
  
      return user
    }
    async findUnique(args: { where: { id: string } }): Promise<IUser | null> {
      const {where} = args
      const {id} = where
  
      const user = usersData.filter(e => e.id === id)[0]
      
      return user
    }
    async findMany(args?: object): Promise<IUser[]> {
      const users = usersData
  
      return users 
    }
    async update(args: { where: { id: string }; data: Partial<Omit<IUser, "id">> }): Promise<IUser> {
      const userToBeUpdated = usersData.filter(e => e.id === args.where.id)[0]
      const newUser = {
        ...userToBeUpdated,
        ...args.data
      }
  
      return newUser
    }
    async delete(args: { where: { id: string } }): Promise<IUser> {
      const {where} = args
      const {id} = where
  
      const event = usersData.filter(e => e.id === id)[0]
      
      return event
    }
  }

  const mockPrismaDotUser = new MockPrismaDotUser()

  class MockUserRepository extends PrismaRepository<IUser> {
    getModel() {
      return mockPrismaDotUser
    }
  }

  const userRepository = new MockUserRepository()
  
  it('should be possible to create an user', async () => {
    const userToBeCreatedData = {
      fullName: 'name-3',
      email: 'email-3',
      password: 'senha-3',
    }

    const userCreated = await userRepository.create(userToBeCreatedData)

    expect(usersData).toContain(userCreated)
    expectTypeOf(userCreated).toEqualTypeOf<IUser>
  })

  it('should be possible to find an user', async () => {
    const userToBeFoundData = {
      id: 'id-test-1',
      fullName: 'name-1',
      password: 'senha-1',
      email: 'email-1',
      createdAt: new Date('2024-10-12T20:47:57.374Z'),
      updatedAt: new Date('2024-10-12T20:47:57.374Z'),
    }

    const userFound = await userRepository.findById(userToBeFoundData.id)

    expect(userFound).toMatchObject(userToBeFoundData)
  })

  it('should be possible to find users', async () => {
    const usersFound = await userRepository.findAll()

    expect(usersFound).toMatchObject(usersData)
  })

  it('should be possible to update user', async () => {
    const userToBeUpdatedData = {
      id: 'id-test-1',
      fullName: 'name-1',
      password: 'senha-1',
      email: 'email-1',
      createdAt: new Date('2024-10-12T20:47:57.374Z'),
      updatedAt: new Date('2024-10-12T20:47:57.374Z'),
    }

    const userUpdated = await userRepository.update(userToBeUpdatedData.id, {fullName: 'name-4', password: 'senha-4',})

    expect(userUpdated).toHaveProperty('fullName', 'name-4')
    expect(userUpdated).toHaveProperty('password', 'senha-4')
  })

  it('should be possible to delete an user', async () => {
    const userToBeDeletedData = {
      id: 'id-test-1',
      fullName: 'name-1',
      password: 'senha-1',
      email: 'email-1',
      createdAt: new Date('2024-10-12T20:47:57.374Z'),
      updatedAt: new Date('2024-10-12T20:47:57.374Z'),
    }

    const userDeleted = await userRepository.delete(userToBeDeletedData.id)

    expect(userDeleted).toMatchObject(userToBeDeletedData)
  })
  
})