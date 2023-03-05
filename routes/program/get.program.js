const router = require('express').Router()
const controller = require('../../controller/program');

router.get('/list', controller.getListProgram)
router.get('/detail/:id', controller.getDetailProgram)

module.exports = router