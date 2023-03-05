const router = require('express').Router()
const controller = require('../../controller/activity');

router.get('/list', controller.getListActivity)

router.get('/detail/:id', controller.getDetailActivity)

module.exports = router