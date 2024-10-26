import { EventDataValidator } from "../../helpers/event-data-validator.js";
import { EventRepository } from "../../repositories/event/event-repository.js";
import { IEvent } from "../../repositories/event/types-event-repository.js";
import { TDataToBeCreated } from "../../repositories/types-base.js";


export class CreateEventUseCase {
  constructor(private repository: EventRepository) {}
  
  private validate(eventData: TDataToBeCreated<IEvent>): void {
    EventDataValidator(eventData); 
  }

  async execute(eventData: TDataToBeCreated<IEvent>): Promise<IEvent> {
    this.validate(eventData);
    const newEvent = this.repository.create(eventData);
    return newEvent
  }

}