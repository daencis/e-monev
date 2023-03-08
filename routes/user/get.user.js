const app = require('express').Router()
const controller = require('../../controller/user');
const middleware = require('../../middleswares/authentication');

app.get('/profile', middleware.authentication, controller.getDetailUser)

app.get('/list', middleware.authentication, controller.getListUser)

app.get('/detail/:id', middleware.authentication, controller.getDetailUser)

module.exports = app
