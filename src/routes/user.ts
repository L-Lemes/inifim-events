import { Request, Response, NextFunction, Router} from "express"
import { UserRepository } from "../repositories/user/user-repository.js"
import { CreateUserUseCase } from "../use-cases/user/create-user-use-case.js"
import { CreateUserController } from "../controllers/user/create-user-controller.js"
import { prisma } from "../prisma.js"

const userRoutes = Router()

const userRepository = new UserRepository(prisma)
const createUserUseCase = new CreateUserUseCase(userRepository)
const createUserController = new CreateUserController(createUserUseCase)

userRoutes.post('/', (req: Request, res: Response, next: NextFunction) => createUserController.handle(req, res, next))

export {userRoutes}