import mongoose from 'mongoose'
const { Schema } = mongoose

const roleSchema = Schema({
  name: String
}, {
  versionKey: false
})

export default mongoose.model('Role', roleSchema)
