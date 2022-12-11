import dotenv from 'dotenv'
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import { connectDB } from './db/mongodb.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(compression())
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
  connectDB()
}).on('error', (e) => {
  console.error('App Error: ', e.message)
  process.exit(1)
})
