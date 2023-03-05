require("dotenv").config();
const express = require('express')
const port = process.env.PORT
const errorHandler = require('./middleswares/errorHandler')

const app = express({
  logger: process.env.LOG,
  bodyLimit: 12485760,
  maxParamLength: 512
})
// const expressRouter = app.router()
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const database = require('./plugins/sequelizeConnector')

app.set(database(app, {
  instance: 'db',
  autoConnect: true,
  dialect: 'mysql',
  logging: true,

  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
}), "db")

app.use('/', require('./routes/index'))
app.use('/user', require('./routes/user'))
app.use('/org', require('./routes/organization'))
app.use('/occasion', require('./routes/occassion'))
app.use('/program', require('./routes/program'))
// app.use('/activity', require('./routes/activity'))
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app