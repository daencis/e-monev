const app = require('express').Router()
const controller = require('../../controller/occassion');
const middleware = require('../../middleswares/authentication');


app.get('/list', middleware.authentication, controller.getListOccassion)
app.get('/detail/:id', middleware.authentication, controller.getDetailOccassion)

module.exports = app