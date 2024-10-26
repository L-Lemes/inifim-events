import { NextFunction, Router, Request, Response } from "express"
import { CreateEventController } from "../controllers/event/create-event-controller.js"
import { CreateEventUseCase } from "../use-cases/event/create-event-use-case.js"
import { EventRepository } from "../repositories/event/event-repository.js"
import { prisma } from "../prisma.js"

const eventRoutes = Router()

const eventRepository = new EventRepository(prisma)
const createEventUseCase = new CreateEventUseCase(eventRepository)
const createEventController = new CreateEventController(createEventUseCase)

eventRoutes.post('/', (req:Request, res: Response, next: NextFunction) => createEventController.handle(req, res, next))

export { eventRoutes }