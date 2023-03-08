const app = require('express').Router();
const controller = require('../../controller/program');
const middleware = require('../../middleswares/authentication')

app.post('/create', middleware.authentication, controller.createProgram)

module.exports = app