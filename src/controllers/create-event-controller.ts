import { IEvent } from "../repositories/event-repository.js";
import { NextFunction, Request, Response } from "express";
import { BaseController } from "./controller.js";

type TEventToBeCreated = Omit<IEvent, 'id' | 'createdAt' | 'updatedAt'>;

interface TCreateEventUseCase {
  execute: (eventData: TEventToBeCreated) => Promise<IEvent>
}

export class EventController extends BaseController {
  constructor (
    private createEventUseCase : TCreateEventUseCase
  ) {
    super()
  }

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