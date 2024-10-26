import { Request, Response, NextFunction } from "express"
import { IEvent } from "../../repositories/event/types-event-repository.js"
import { TDataToBeCreated } from "../../repositories/types-base.js"

interface TCreateEventUseCase {
  execute: (eventData: TDataToBeCreated<IEvent>) => Promise<IEvent>
}

export class CreateEventController {
  constructor (
    private createEventUseCase : TCreateEventUseCase
  ) {}

  handle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {data} = req.body

    try {
      const newEvent = await this.createEventUseCase.execute(data)
      res.status(201).json(newEvent);
    } catch(err) {
      if(err instanceof Error) res.status(400).json(err.message);
    }
  }

}