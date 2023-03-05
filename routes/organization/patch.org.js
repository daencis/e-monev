const router = require('express').Router()
const controller = require('../../controller/organization');

router.patch('/update', controller.updateOrganization)
router.patch('/delete', controller.deleteOrganization)

module.exports = router