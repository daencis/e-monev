const app = require('express').Router()
const controller = require('../../controller/data_master');
const middleware = require('../../middleswares/authentication');

app.post('/create', middleware.authentication, controller.createDataMaster)

module.exports = app