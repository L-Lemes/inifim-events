import { describe, it, expect, expectTypeOf, vi } from "vitest"
import { IUser, TCreateData, TUpdateData } from "../../repositories/types-user-reposiotry.js";
import { UserRepository } from "../../repositories/user-repository.js";
import { prisma } from "../../prisma.js";


describe("test user repository instance logic", () => {
  const usersData = [
    {
      id: 'id-test-1',
      name: 'name-1',
      email: 'email-1', 
      password: 'senha-1',
      createdAt: new Date('2024-10-12T20:47:57.374Z'),
      updatedAt: new Date('2024-10-12T20:47:57.374Z'),
      managedEvents: [],               
      eventsIWasInvitedTo: [], 
      configuration : {
        id: 'config-id-1',
        language: 'pt-br',
        overallVolume: 80,
        musicVolume: 80,
        soundEffects: 80,
        textSize: 100,
        userId: 'id-test-1'
      },      
      location: []   
    },
    {
      id: 'id-test-2',
      name: 'name-2',
      email: 'email-2', 
      password: 'senha-2',
      createdAt: new Date('2024-10-12T20:47:57.374Z'),
      updatedAt: new Date('2024-10-12T20:47:57.374Z'),
      managedEvents: [],               
      eventsIWasInvitedTo: [], 
      configuration : {
        id: 'config-id-2',
        language: 'pt-br',
        overallVolume: 80,
        musicVolume: 80,
        soundEffects: 80,
        textSize: 100,
        userId: 'id-test-2'
      },      
      location: []
    }
  ]

  const userRepository = new UserRepository(prisma)

  vi.spyOn(userRepository, 'create').mockImplementation(async (data: TCreateData<IUser>): Promise<IUser> => {
    const newUser = {
      id: 'id-test-3',
      ...data,
      createdAt: new Date('2024-10-12T20:47:57.374Z'),
      updatedAt: new Date('2024-10-12T20:47:57.374Z'),
      managedEvents: [],               
      eventsIWasInvitedTo: [], 
      configuration : {
        id: 'config-id-1',
        language: 'pt-br',
        overallVolume: 80,
        musicVolume: 80,
        soundEffects: 80,
        textSize: 100,
        userId: 'id-test-1'
      },      
      location: []
    };

    usersData.push(newUser)

    return newUser
  });

  vi.spyOn(userRepository, 'findById').mockImplementation(async (id: string): Promise<IUser> => {
      const userFound = usersData.filter(e => e.id === id)[0]
      
      return userFound
  });

  vi.spyOn(userRepository, 'update').mockImplementation(async (id: string, data: TUpdateData<IUser>): Promise<IUser> => {
      const userFound = usersData.filter(e => e.id === id)[0]

      const userUpdated = {
        ...userFound,
        ...data
      }
      
      return userUpdated
  });

  vi.spyOn(userRepository, 'delete').mockImplementation(async (id: string): Promise<IUser> => {
    const userDeleted = usersData.filter(e => e.id === id)[0]
    
    const index = usersData.findIndex(user => user.id === id);
    if (index !== -1) usersData.splice(index, 1)

    return userDeleted
  });

  
  it('should be possible to create an user', async () => {
    const userToBeCreatedData = {
      name: 'name-3',
      email: 'email-3',
      password: 'senha-3',
    }

    const userCreated = await userRepository.create(userToBeCreatedData)

    expect(usersData).toContain(userCreated)
    expectTypeOf(userCreated).toEqualTypeOf<IUser>
  })

  it('should be possible to find an user', async () => {
    const userToBeFoundData = usersData[0]

    const userFound = await userRepository.findById(userToBeFoundData.id)

    expect(userFound).toMatchObject(userToBeFoundData)
  })

  it('should be possible to update user', async () => {
    const userToBeUpdatedData = usersData[0]

    const userUpdated = await userRepository.update(userToBeUpdatedData.id, {name: 'name-4', password: 'senha-4',})

    expect(userUpdated).toHaveProperty('name', 'name-4')
    expect(userUpdated).toHaveProperty('password', 'senha-4')
  })

  it('should be possible to delete an user', async () => {
    const userToBeDeletedData = usersData[0]

    const userDeleted = await userRepository.delete(userToBeDeletedData.id)

    expect(userDeleted).toMatchObject(userToBeDeletedData)
  })
  
})