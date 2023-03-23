const app = require('express').Router()
const controller = require('../../controller/data_master');
const middleware = require('../../middleswares/authentication');

app.get('/list', middleware.authentication, controller.getListDataMaster)

app.get('/detail/:id', middleware.authentication, controller.getDetailDataMaster)

module.exports = app