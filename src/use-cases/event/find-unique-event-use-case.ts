import { IEvent } from "../../repositories/event-repository.js";
import { PrismaRepository } from "../../repositories/prisma-repository.js";

type TEventToBeFound = string

export class FindAllEvents {
  constructor(private repository: PrismaRepository<IEvent>) {}
  
  async execute(eventId: TEventToBeFound): Promise<IEvent | null> {
    if (!eventId) throw new Error('ID is required')

    const eventFound = this.repository.findById(eventId);

    if (!eventFound) throw new Error('fe')

    return eventFound
  }

}