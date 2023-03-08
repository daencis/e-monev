require("dotenv").config();
const http = require('http')
const express = require('express')
const port = process.env.PORT
const errorHandler = require('./middleswares/errorHandler')

const app = express({
  logger: process.env.LOG,
  bodyLimit: 12485760,
  maxParamLength: 512
})
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', require('./routes/index'))
app.use('/user', require('./routes/user'))
app.use('/org', require('./routes/organization'))
app.use('/occasion', require('./routes/occassion'))
app.use('/program', require('./routes/program'))
app.use('/activity', require('./routes/activity'))
app.use(errorHandler)

app.set('port', port)

const server = http.createServer(app)
server.listen(port)

module.exports = app