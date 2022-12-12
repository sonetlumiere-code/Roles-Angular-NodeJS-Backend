import dotenv from 'dotenv'
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import passport from 'passport'
import { passportConfig } from './config/passport/passportConfig.js'
import { connectDB } from './db/mongodb.js'
import { userRouter } from './routes/user.router.js'
dotenv.config()
passportConfig(passport)

const app = express()
const PORT = process.env.PORT

// middlewares
app.use(compression())
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(passport.initialize())

// routes
app.use('/api', userRouter)

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
  connectDB()
}).on('error', (e) => {
  console.error('App Error: ', e.message)
  process.exit(1)
})
