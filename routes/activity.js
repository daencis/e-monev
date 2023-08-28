const app = require('express').Router()
const controller = require('../controller/activity');
const middleware = require('../middleswares/authentication');

app.get('/list', middleware.authentication, controller.getListActivity)

app.get('/detail/:id', middleware.authentication, controller.getDetailActivity)

app.patch('/update', middleware.authentication, controller.updateActivity)

app.patch('/delete', middleware.authentication, controller.deleteActivity)

app.post('/create', middleware.authentication, controller.createActivity)

module.exports = app