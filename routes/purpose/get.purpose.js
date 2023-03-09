const app = require('express').Router();
const controller = require('../../controller/purpose');
const middleware = require('../../middleswares/authentication')

app.get('/list', middleware.authentication, controller.getListPurpose)

app.get('/detail/:id', middleware.authentication, controller.getDetailPurpose)

module.exports = app