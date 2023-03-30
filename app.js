require("dotenv").config();
const http = require('http')
const express = require('express')
const cors = require('cors')
const port = process.env.PORT
const errorHandler = require('./middleswares/errorHandler')

const app = express({
  logger: process.env.LOG,
  bodyLimit: 12485760,
  maxParamLength: 512
})
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


require('./routes/index')(app)
require('./routes/user')(app)
require('./routes/organization')(app)
require('./routes/occassion')(app)
require('./routes/program')(app)
require('./routes/purpose')(app)
require('./routes/activity')(app)
require('./routes/data_master')(app)
require('./routes/data_report')(app)
app.get('*', (req, res) => res.status(404).send({
  status: false,
  message: 'Api tidak ditemukan.'
}))
app.patch('*', (req, res) => res.status(404).send({
  status: false,
  message: 'Api tidak ditemukan.'
}))
app.post('*', (req, res) => res.status(404).send({
  status: false,
  message: 'Api tidak ditemukan.'
}))
app.use(errorHandler)

app.set('port', port)

const server = http.createServer(app)
server.listen(port)

module.exports = app