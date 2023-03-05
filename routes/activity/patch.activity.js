const router = require('express').Router()
const controller = require('../../controller/activity');

router.patch('/update', controller.updateActivity)
router.patch('/detele', controller.deleteActivity)

module.exports = router