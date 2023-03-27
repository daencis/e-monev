const app = require('express').Router()
const controller = require('../../controller/data_report');
const middleware = require('../../middleswares/authentication');

app.get('/list', middleware.authentication, controller.getListDataReport)

app.get('/detail/:id', middleware.authentication, controller.getDetailDataReport)

module.exports = app