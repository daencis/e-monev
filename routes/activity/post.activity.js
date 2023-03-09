const app = require('express').Router()
const controller = require('../../controller/activity');
const middleware = require('../../middleswares/authentication');

app.post('/create', middleware.authentication, controller.createActivity)

module.exports = app