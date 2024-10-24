import express from "express"

import { prisma } from "./prisma.js"
import { UserRepository } from "./repositories/user-repository.js";
import { ConfigurationRepository } from "./repositories/configuration-repository.js";

const app = express()
app.use(express.json())

const data = {
  overallVolume: 100
};

const id = '90ab1622-010c-49ec-bdf5-c2033939ed2d'

const userRepository = new ConfigurationRepository(prisma)
const newUser = await userRepository.update(id, data)

app.listen(3333, () => {
  console.log("é o homi n tem jeito")
})