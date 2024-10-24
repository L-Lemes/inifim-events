import { describe } from "node:test";
import { prisma } from "../../prisma.js";
import { ConfigurationRepository } from "../../repositories/configuration-repository.js";
import { expect, it, vi } from "vitest";
import { IConfiguration } from "../../repositories/types-configuration-repository.js";

describe('test configurations repository instance logic', () => {
  const configurationsData = [
    {
      id: 'id-config-1',
      userId: 'id-user-1',
      user: {
        id: 'id-user-1',
        name: 'name-1',
        email: 'email-1', 
        password: 'senha-1',
        createdAt: new Date('2024-10-12T20:47:57.374Z'),
        updatedAt: new Date('2024-10-12T20:47:57.374Z'),
        managedEvents: [],               
        eventsIWasInvitedTo: [],      
        location: []   
      }, 
      createdAt: new Date('2024-10-12T20:47:57.374Z'),
      updatedAt: new Date('2024-10-12T20:47:57.374Z'),
      language: 'pt-br',
      overallVolume: 80,
      musicVolume: 80,
      soundEffects: 80,
      textSize: 80,
    },
    {
      id: 'id-config-2',
      userId: 'id-user-2',
      user: {
        id: 'id-user-2',
        name: 'name-2',
        email: 'email-2', 
        password: 'senha-2',
        createdAt: new Date('2024-10-12T20:47:57.374Z'),
        updatedAt: new Date('2024-10-12T20:47:57.374Z'),
        managedEvents: [],               
        eventsIWasInvitedTo: [],      
        location: []   
      }, 
      createdAt: new Date('2024-10-12T20:47:57.374Z'),
      updatedAt: new Date('2024-10-12T20:47:57.374Z'),
      language: 'pt-br',
      overallVolume: 80,
      musicVolume: 80,
      soundEffects: 80,
      textSize: 80,
    }
  ]

  const configurationRepository = new ConfigurationRepository(prisma)
  
  vi.spyOn(configurationRepository, 'findById').mockImplementation(async (id: string): Promise<IConfiguration> => {
    const userFound = configurationsData.filter(e => e.id === id)[0]
    
    return userFound
  });

  vi.spyOn(configurationRepository, 'update').mockImplementation(async (id: string, data: Partial<Omit<IConfiguration, 'userId' | 'user'>>): Promise<IConfiguration>=> {
    const configurationToBeUpdated = configurationsData.filter(e => e.id === id)[0]

    const configurationUpdated = {
      ...configurationToBeUpdated,
      ...data
    }

    return configurationUpdated
  })

  it('should be possible found a configuration by id', async () => {
    const configurationFound = await configurationRepository.findById(configurationsData[0].id)

    expect(configurationFound).toMatchObject(configurationsData[0])
  })

  it('should be possible updated a configuration', async () => {
    const configurationFound = await configurationRepository.findById(configurationsData[0].id)

    expect(configurationFound).toMatchObject(configurationsData[0])
  })
})