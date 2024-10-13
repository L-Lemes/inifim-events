import express from "express"
import { clerkMiddleware } from '@clerk/express'
const app = express()
app.use(clerkMiddleware())

app.listen(3333, () => {
  console.log("é o homi n tem jeito")
})