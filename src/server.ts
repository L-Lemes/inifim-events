import express from "express"

import { prisma } from "./prisma.js"
import { UserRepository } from "./repositories/user/user-repository.js";
import { ConfigurationRepository } from "./repositories/configuration/configuration-repository.js";
import { eventRoutes } from "./routes/event.js";
import { IUser } from "./repositories/user/types-user-reposiotry.js";
import { userRoutes } from "./routes/user.js";

const app = express()

app.use(express.json())

app.use('/user', userRoutes) 
app.use('/event', eventRoutes)

app.listen(3333, () => {
  console.log("é o homi n tem jeito")
})