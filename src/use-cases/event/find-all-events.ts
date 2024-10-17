import { EventDataValidator } from "../../helpers/event-data-validator.js";
import { IEvent } from "../../repositories/event-repository.js";
import { PrismaRepository } from "../../repositories/prisma-repository.js";

type TEventsToBeFound = object | undefined

export class FindUniqueEvent {
  constructor(private repository: PrismaRepository<IEvent>) {}
  
  async execute(event: TEventsToBeFound): Promise<IEvent[] | []> {
    const events = this.repository.findAll(event);
    if (!events) throw new Error('fe')
    return events
  }

}