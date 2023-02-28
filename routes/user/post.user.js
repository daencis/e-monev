const postLogin = require('express').Router()
const controller = require('../../controller/user')

postLogin.post('/login', controller.login)
postLogin.post('/register', controller.addUser)

module.exports = postLogin