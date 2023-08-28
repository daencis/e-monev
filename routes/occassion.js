const app = require('express').Router()
const controller = require('../controller/occassion');
const middleware = require('../middleswares/authentication');

app.get('/list', middleware.authentication, controller.getListOccassion)

app.get('/detail/:id', middleware.authentication, controller.getDetailOccassion)

app.patch('/update', middleware.authentication, controller.updateOccassion)

app.patch('/delete', middleware.authentication, controller.deleteOccassion)

app.post('/create', middleware.authentication, controller.createOccassion)

module.exports = app