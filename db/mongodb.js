import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { initialSetup } from '../models/initial_setup.js'
dotenv.config()

const dbURI = `${process.env.mongoDB_URL}/${process.env.DB_NAME}`

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 90000
}

mongoose.set('strictQuery', false)

export const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, dbOptions)
    await initialSetup.createRoles()
    console.log('MongoDB connected')
  } catch (error) {
    console.error(`Error in MongoDB connection: ${error}`)
    process.exit(1)
  }
}
