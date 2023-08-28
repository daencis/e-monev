const app = require('express').Router()
const controller = require('../controller/user');
const middleware = require('../../middleswares/authentication');

app.post('/login', controller.login)

app.post('/register', controller.createUser)

app.patch('/update', controller.updateUser)

app.patch('/delete', controller.deleteUser)

app.get('/profile', middleware.authentication, controller.getDetailUser)

app.get('/list', middleware.authentication, controller.getListUser)

app.get('/detail/:id', middleware.authentication, controller.getUserDetail)

module.exports = app