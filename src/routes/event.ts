import { Router } from "express"
import { CreateEventController } from "../controllers/create-event-controller.js"
import { CreateEventUseCase } from "../use-cases/event/create-event-use-case.js"
import { EventRepository } from "../repositories/event-repository.js"
import { prisma } from "../prisma.js"

const eventRoute = Router()

const eventRepository = new EventRepository(prisma)
const createEventUseCase = new CreateEventUseCase(eventRepository)
const createEventController = new CreateEventController(createEventUseCase)

eventRoute.post('/', createEventController.handle)

export { eventRoute }