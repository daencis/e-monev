const app = require('express').Router();
const controller = require('../../controller/organization');
const middleware = require('../../middleswares/authentication');

app.post('/create', middleware.authentication, controller.createOrganization)

module.exports = app