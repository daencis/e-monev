const router = require('express').Router()
const controller = require('../../controller/occassion');

router.get('/list', controller.getListOccassion)
router.get('/detail/:id', controller.getDetailOccassion)

module.exports = router