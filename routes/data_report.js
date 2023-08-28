const app = require('express').Router()
const controller = require('../controller/data_report');
const middleware = require('../middleswares/authentication');

app.get('/list', middleware.authentication, controller.getListDataReport)

app.get('/detail/:id', middleware.authentication, controller.getDetailDataReport)

app.patch('/update', middleware.authentication, controller.updateDataReport)

app.patch('/delete', middleware.authentication, controller.deleteDataReport)

app.post('/create', middleware.authentication, controller.createDataReport)

module.exports = app