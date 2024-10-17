import express, {Request, Response} from "express"
import { CreateEvent } from "./use-cases/event/create-event-use-case.js"
import { EventController } from "./controllers/create-event-controller.js"
import { EventRepository } from "./repositories/event-repository.js"
import { prisma } from "./prisma.js"

const app = express()
app.use(express.json())

const eventRepository = new EventRepository(prisma)
const createEventUseCase = new CreateEvent(eventRepository)
const eventController = new EventController(createEventUseCase)

app.post('/', eventController.handle)

app.listen(3333, () => {
  console.log("é o homi n tem jeito")
})