const app = require('express').Router()
const controller = require('../../controller/purpose');
const middleware = require('../../middleswares/authentication')

app.patch('/update',  middleware.authentication, controller.updatePurpose)
app.patch('/delete',  middleware.authentication, controller.deletePurpose)

module.exports = app