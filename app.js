require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
})
