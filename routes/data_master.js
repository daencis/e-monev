const app = require('express').Router()
const controller = require('../controller/data_master');
const middleware = require('../middleswares/authentication');

app.get('/list', middleware.authentication, controller.getListDataMaster)

app.get('/detail/:id', middleware.authentication, controller.getDetailDataMaster)

app.patch('/update', middleware.authentication, controller.updateDataMaster)

app.patch('/delete', middleware.authentication, controller.deleteDataMaster)

app.post('/create', middleware.authentication, controller.createDataMaster)

module.exports = app