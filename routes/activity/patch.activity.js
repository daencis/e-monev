const app = require('express').Router();
const controller = require('../../controller/activity');
const middleware = require('../../middleswares/authentication');

app.patch('/update', middleware.authentication, controller.updateActivity)
app.patch('/detele', middleware.authentication, controller.deleteActivity)

module.exports = app