import { prisma } from "../../prisma.js";
import { EventRepository } from "../../repositories/event/event-repository.js";
import { IEvent } from "../../repositories/event/types-event-repository.js";
import { TDataToBeCreated } from "../../repositories/types-base.js";


export class CreateEventUseCase {
  constructor(private repository: EventRepository) {}

  async execute(eventData: TDataToBeCreated<IEvent>): Promise<IEvent> {

    const existsEvent = await prisma.event.findMany({where: {
      location: eventData.location,
    }})

    const eventAtTheSameTime = existsEvent.filter(e => 
      eventData.startDate <= e.endDate &&
      eventData.endDate >= e.startDate &&
      eventData.startTime <= e.endTime &&
      eventData.endTime >= e.startTime
    );

    if (eventAtTheSameTime.length) throw new Error('ja tem evento nesse horario fdp')

    const newEvent = this.repository.create(eventData);
    return newEvent
  }

}