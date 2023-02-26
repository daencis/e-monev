require("dotenv").config();
const express = require('express')
const app = express()
const port = process.env.PORT

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// app.use('db', require('./models'))
app.use('/', require('./routes/index'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})