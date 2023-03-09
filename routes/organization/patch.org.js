const app = require('express').Router();
const controller = require('../../controller/organization');
const middleware = require('../../middleswares/authentication');

app.patch('/update', middleware.authentication, controller.updateOrganization)
app.patch('/delete', middleware.authentication, controller.deleteOrganization)

module.exports = app