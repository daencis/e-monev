const router = require('express').Router()
const controller = require('../../controller/purpose');

router.get('/list', controller.getListPurpose)
router.get('/detail/:id', controller.getDetailPurpose)

module.exports = router