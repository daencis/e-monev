const app = require('express').Router()
const controller = require('../../controller/occassion');
const middleware = require('../../middleswares/authentication');

app.patch('/update', middleware.authentication, controller.updateOccassion)

app.patch('/delete', middleware.authentication, controller.deleteOccassion)

module.exports = app