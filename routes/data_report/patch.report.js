const app = require('express').Router();
const controller = require('../../controller/data_report');
const middleware = require('../../middleswares/authentication');

app.patch('/update', middleware.authentication, controller.updateDataReport)
app.patch('/delete', middleware.authentication, controller.deleteDataReport)

module.exports = app