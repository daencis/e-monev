const app = require('express').Router()
const controller = require('../../controller/purpose');
const middleware = require('../../middleswares/authentication')

app.patch('/update',  middleware.authentication, controller.updatePurpose)

module.exports = app