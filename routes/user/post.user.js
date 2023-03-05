const postLogin = require('express').Router();
const controller = require('../../controller/user');
const { body, validationResult } = require('express-validator');

postLogin.post('/login', controller.login)
postLogin.post('/register', controller.addUser)

module.exports = postLogin