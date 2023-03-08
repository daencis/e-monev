const app = require('express').Router();
const controller = require('../../controller/program');
const middleware = require('../../middleswares/authentication');

app.patch('/update', middleware.authentication, controller.updateProgram)

app.patch('/delete', middleware.authentication, controller.deleteProgram)

module.exports = app