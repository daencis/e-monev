const app = require('express').Router();
const controller = require('../controller/organization');
const middleware = require('../middleswares/authentication');

app.get('/list', middleware.authentication, controller.getListOrganization)

app.get('/detail/:id', middleware.authentication, controller.getDetailOrganization)

app.patch('/update', middleware.authentication, controller.updateOrganization)

app.patch('/delete', middleware.authentication, controller.deleteOrganization)

app.post('/create', middleware.authentication, controller.createOrganization)

module.exports = app