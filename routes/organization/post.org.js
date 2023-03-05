const router = require('express').Router()
const controller = require('../../controller/organization')

router.post('/create', controller.createOrganization)

module.exports = router