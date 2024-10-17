import { IEvent } from "../../repositories/event-repository.js";
import { PrismaRepository } from "../../repositories/prisma-repository.js";

type TEventIdToBeUpdated = string 
type TNewData = Partial<Omit<IEvent, 'id'>>

export class UpdateEvent {
  constructor(
    private repository: PrismaRepository<IEvent>
  ) {}

  async execute(id: TEventIdToBeUpdated, data: TNewData): Promise<IEvent> {
    if (!id) throw new Error('ID is required')

    const eventExists = await this.repository.findById(id)

    if (!eventExists) throw new Error('Event not found')

    const eventUpdated = this.repository.update(id, data);

    return eventUpdated
  }

}