const router = require('express').Router()
const controller = require('../../controller/activity');

router.post('/create', controller.createActivity)

module.exports = router