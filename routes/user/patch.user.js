const app = require('express').Router();
const controller = require('../../controller/user');

app.patch('/update', controller.updateUser)
app.patch('/delete', controller.deleteUser)

module.exports = app
  