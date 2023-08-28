const app = require('express').Router();
const controller = require('../controller/purpose');
const middleware = require('../middleswares/authentication')

app.get('/list', middleware.authentication, controller.getListPurpose)

app.get('/detail/:id', middleware.authentication, controller.getDetailPurpose)

app.patch('/update',  middleware.authentication, controller.updatePurpose)

app.patch('/delete',  middleware.authentication, controller.deletePurpose)

app.post('/create', middleware.authentication, controller.createPurpose)

module.exports = app