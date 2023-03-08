const app = require('express').Router()
const controller = require('../../controller/activity');
const middleware = require('../../middleswares/authentication');

app.get('/list', middleware.authentication, controller.getListActivity)

app.get('/detail/:id', middleware.authentication, controller.getDetailActivity)

module.exports = app