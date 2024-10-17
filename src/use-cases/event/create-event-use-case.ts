import { EventDataValidator } from "../../helpers/event-data-validator.js";
import { IEvent } from "../../repositories/event-repository.js";
import { PrismaRepository } from "../../repositories/prisma-repository.js";

type TEventToBeCreated = Omit<IEvent, 'id' | 'createdAt' | 'updatedAt'>;

export class CreateEvent {
  constructor(private repository: PrismaRepository<IEvent>) {}
  
  private validate(eventData: TEventToBeCreated): void {
    EventDataValidator(eventData); 
  }

  async execute(eventData: TEventToBeCreated): Promise<IEvent> {
    this.validate(eventData);
    const newEvent = this.repository.create(eventData);
    return newEvent
  }

}