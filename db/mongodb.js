const mongoose = require('mongoose')
const initialSetup = require('../models/initial_setup')
require('../models/user.model')

const settings = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  serverSelectionTimeoutMS: 90000
}

mongoose.connect(process.env.MONGODB_URI, settings, (err) => {
  if (!err) {
    initialSetup.createRoles()
    console.log('MongoDB connection succeeded.')
  } else {
    console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2))
  }
})
