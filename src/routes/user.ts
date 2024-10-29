import { Request, Response, NextFunction, Router} from "express"
import { UserRepository } from "../repositories/user/user-repository.js"
import { RegisterUserUseCase } from "../use-cases/user/register-user-use-case.js"
import { RegisterUserController } from "../controllers/user/register-user-controller.js"
import { prisma } from "../prisma.js"

const userRoutes = Router()

const userRepository = new UserRepository()

userRepository.setPrismaInstance(prisma)

const createUserUseCase = new RegisterUserUseCase(userRepository)
const createUserController = new RegisterUserController(createUserUseCase)

userRoutes.post('/', (req: Request, res: Response, next: NextFunction) => createUserController.handle(req, res, next))

export {userRoutes}