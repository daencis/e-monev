const getRouter = require('express').Router()
const controller = require('../../controller/organization')


getRouter.get('/list', controller.getListOrganization)

module.exports = getRouter