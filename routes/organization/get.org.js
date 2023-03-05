const getRouter = require('express').Router()
const controller = require('../../controller/organization')

router.get('/list', controller.getListOrganization)
router.get('/detail/:id', controller.getDetailOrganization)

module.exports = getRouter