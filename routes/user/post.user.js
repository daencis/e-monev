const app = require('express').Router()

const controller = require('../../controller/user');

app.post('/login', controller.login)

app.post('/register', controller.createUser)

module.exports = app