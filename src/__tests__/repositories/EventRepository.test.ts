import { describe, it, expect, expectTypeOf } from "vitest"
import { PrismaModelMethods, ModelRepository } from "../../repositories/ModelRepository.js"
import { IEvent } from "../../repositories/EventRepository.js"


describe("test events repositories methods", () => {
  const eventsData = [
    {
      id: 'id-test-1',
      name: 'name-1',
      numberOfGuests: 100,
      local: 'local-1',
      date: new Date('2024-10-12T20:47:57.374Z'),
      startTime: new Date('2024-10-12T20:47:57.374Z'),
      endTime: new Date('2024-10-12T20:47:57.374Z'),
      createdAt: new Date('2024-10-12T20:47:57.374Z'),
      updatedAt: new Date('2024-10-12T20:47:57.374Z'),
    },
    {
    id: 'id-test-2',
    name: 'name-2',
    numberOfGuests: 200,
    local: 'local-2',
    date: new Date('2024-10-12T20:47:57.374Z'),
    startTime: new Date('2024-10-12T20:47:57.374Z'),
    endTime: new Date('2024-10-12T20:47:57.374Z'),
    createdAt: new Date('2024-10-12T20:47:57.374Z'),
    updatedAt: new Date('2024-10-12T20:47:57.374Z'),
  }]
  
  class MockPrismaDotEvent implements PrismaModelMethods<IEvent> {
    async create(args: {data: Omit<IEvent, 'id' | 'createdAt' | 'updatedAt'> }): Promise<IEvent> {
      const {data} = args
  
      const event = {
        id: 'id-test-3',
        ...data,
        createdAt: new Date('2024-10-12T20:47:57.374Z'),
        updatedAt: new Date('2024-10-12T20:47:57.374Z'),
      };
  
      eventsData.push(event)
  
      return event
    }
    async findUnique(args: { where: { id: string } }): Promise<IEvent | null> {
      const {where} = args
      const {id} = where
  
      const event = eventsData.filter(e => e.id === id)[0]
      
      return event
    }
    async findMany(args?: object): Promise<IEvent[]> {
      const events = eventsData
  
      return events 
    }
    async update(args: { where: { id: string }; data: Partial<Omit<IEvent, "id">> }): Promise<IEvent> {
      const eventToBeubdated = eventsData.filter(e => e.id === args.where.id)[0]
      const newEvent = {
        ...eventToBeubdated,
        ...args.data
      }
  
      return newEvent
    }
    async delete(args: { where: { id: string } }): Promise<IEvent> {
      const {where} = args
      const {id} = where
  
      const event = eventsData.filter(e => e.id === id)[0]
      
      return event
    }
  }

  const mockPrismaEvent = new MockPrismaDotEvent()

  class MockEventRepository extends ModelRepository<IEvent> {
    protected getModel() {
      return mockPrismaEvent
    }
  }
  const eventRepository = new MockEventRepository()
  
  it('should be possible to create an event', async () => {
    const eventToBeCreatedData = {
      name: 'name-3',
      numberOfGuests: 300,
      local: 'local-3',
      date: new Date('2024-10-12T20:47:57.374Z'),
      startTime: new Date('2024-10-12T20:47:57.374Z'),
      endTime: new Date('2024-10-12T20:47:57.374Z'),
    }

    const eventCreated = await eventRepository.create(eventToBeCreatedData)

    expect(eventsData).toContain(eventCreated)
    expectTypeOf(eventCreated).toEqualTypeOf<IEvent>
  })

  it('should be possible to find an event', async () => {
    const eventToBeFoundData = {
      id: 'id-test-1',
      name: 'name-1',
      numberOfGuests: 100,
      local: 'local-1',
      date: new Date('2024-10-12T20:47:57.374Z'),
      startTime: new Date('2024-10-12T20:47:57.374Z'),
      endTime: new Date('2024-10-12T20:47:57.374Z'),
      createdAt: new Date('2024-10-12T20:47:57.374Z'),
      updatedAt: new Date('2024-10-12T20:47:57.374Z'),
    }

    const eventFound = await eventRepository.findById(eventToBeFoundData.id)

    expect(eventFound).toMatchObject(eventToBeFoundData)
  })

  it('should be possible to find events', async () => {
    const eventsFound = await eventRepository.findAll()

    expect(eventsFound).toMatchObject(eventsData)
  })

  it('should be possible to update events', async () => {
    const eventToBeUpdatedData = {
      id: 'id-test-1',
      name: 'name-1',
      numberOfGuests: 100,
      local: 'local-1',
      date: new Date('2024-10-12T20:47:57.374Z'),
      startTime: new Date('2024-10-12T20:47:57.374Z'),
      endTime: new Date('2024-10-12T20:47:57.374Z'),
      createdAt: new Date('2024-10-12T20:47:57.374Z'),
      updatedAt: new Date('2024-10-12T20:47:57.374Z'),
    }

    const eventUpdated = await eventRepository.update(eventToBeUpdatedData.id, {name: 'name-3', numberOfGuests: 400,})

    expect(eventUpdated).toHaveProperty('name', 'name-3')
    expect(eventUpdated).toHaveProperty('numberOfGuests', 400)
  })

  it('should be possible to delete an event', async () => {
    const eventToBeDeletedData = {
      id: 'id-test-1',
      name: 'name-1',
      numberOfGuests: 100,
      local: 'local-1',
      date: new Date('2024-10-12T20:47:57.374Z'),
      startTime: new Date('2024-10-12T20:47:57.374Z'),
      endTime: new Date('2024-10-12T20:47:57.374Z'),
      createdAt: new Date('2024-10-12T20:47:57.374Z'),
      updatedAt: new Date('2024-10-12T20:47:57.374Z'),
    }

    const eventDeleted = await eventRepository.delete(eventToBeDeletedData.id)

    expect(eventDeleted).toMatchObject(eventToBeDeletedData)
  })
  
})