import express from "express"

import { eventRoutes } from "./routes/event.js";
import { userRoutes } from "./routes/user.js";
import { UserRepository } from "./repositories/user/user-repository.js";
import { LoginUserUseCase } from "./use-cases/user/login-user-use-case.js";
import { LoginUserControler } from "./controllers/user/login-user-controller.js";
import { TokenRenewalMiddleware } from "./middlewares/token-renewal-middleware.js";

const app = express()

app.use(express.json())

const userRepository_2 = new UserRepository()

const loginUserUseCase = new LoginUserUseCase(userRepository_2)
const loginUserControler = new LoginUserControler(loginUserUseCase)

const tokenRenewalMiddleware = new TokenRenewalMiddleware()


app.use('/user', userRoutes) 
app.use('/event', tokenRenewalMiddleware.handle, eventRoutes)
app.post('/login', loginUserControler.handle)


app.listen(3333, () => {
  console.log("é o homi n tem jeito")
})