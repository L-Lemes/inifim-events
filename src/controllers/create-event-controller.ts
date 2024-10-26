import { Request, Response, NextFunction } from "express"
import { IEvent, TCreate, TCreateData } from "../repositories/types-event-repository.js"
interface TCreateEventUseCase {
  execute: (eventData: TCreateData<IEvent>) => Promise<IEvent>
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
      if(err instanceof Error) res.status(400).send(err.message);
    }
  }

}