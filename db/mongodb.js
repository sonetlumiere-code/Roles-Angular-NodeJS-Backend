import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { initialSetup } from '../models/initial_setup.model.js'
dotenv.config()

const mongoURL = process.env.mongoDB_URL
const dbName = process.env.DB_NAME
const dbURI = `${mongoURL}/${dbName}`

console.log(dbURI)

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
