const app = require('express').Router();
const controller = require('../../controller/data_master');
const middleware = require('../../middleswares/authentication');

app.patch('/update', middleware.authentication, controller.updateDataMaster)
app.patch('/delete', middleware.authentication, controller.deleteDataMaster)

module.exports = app