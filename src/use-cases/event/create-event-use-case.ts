import { EventDataValidator } from "../../helpers/event-data-validator.js";
import { EventRepository } from "../../repositories/event-repository.js";
import { IEvent, TCreateData } from "../../repositories/types-event-repository.js";


export class CreateEventUseCase {
  constructor(private repository: EventRepository) {}
  
  private validate(eventData: TCreateData<IEvent>): void {
    EventDataValidator(eventData); 
  }

  async execute(eventData: TCreateData<IEvent>): Promise<IEvent> {
    this.validate(eventData);
    const newEvent = this.repository.create(eventData);
    return newEvent
  }

}