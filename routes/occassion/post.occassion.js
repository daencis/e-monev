const app = require('express').Router()
const controller = require('../../controller/occassion');
const middleware = require('../../middleswares/authentication');


app.post('/create', middleware.authentication, controller.createOccassion)

module.exports = app