const app = require('express').Router();
const controller = require('../../controller/purpose');
const middleware = require('../../middleswares/authentication');

app.post('/create', middleware.authentication, controller.createPurpose)

module.exports = app