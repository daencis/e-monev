const app = require('express').Router();
const controller = require('../controller/program');
const middleware = require('../middleswares/authentication')

app.get('/list', middleware.authentication, controller.getListProgram)

app.get('/detail/:id', middleware.authentication, controller.getDetailProgram)

app.patch('/update', middleware.authentication, controller.updateProgram)

app.patch('/delete', middleware.authentication, controller.deleteProgram)

app.post('/create', middleware.authentication, controller.createProgram)

module.exports = app
  