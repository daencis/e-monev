const app = require('express').Router()
const controller = require('../../controller/data_report');
const middleware = require('../../middleswares/authentication');

app.post('/create', middleware.authentication, controller.createDataReport)

module.exports = app