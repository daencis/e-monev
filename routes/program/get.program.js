const app = require('express').Router();
const controller = require('../../controller/program');
const middleware = require('../../middleswares/authentication')

app.get('/list', middleware.authentication, controller.getListProgram)
app.get('/detail/:id', middleware.authentication, controller.getDetailProgram)

module.exports = app
  