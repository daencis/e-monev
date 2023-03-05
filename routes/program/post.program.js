const router = require('express').Router()
const controller = require('../../controller/program');

router.post('/create', controller.createProgram)

module.exports = router