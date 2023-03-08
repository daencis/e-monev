const app = require('express').Router();
const controller = require('../../controller/organization');
const middleware = require('../../middleswares/authentication');

app.get('/list', middleware.authentication, controller.getListOrganization)
app.get('/detail/:id', middleware.authentication, controller.getDetailOrganization)

module.exports = app