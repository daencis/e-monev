const router = require('express').Router()
const controller = require('../../controller/occassion');

router.post('/create', controller.createOccassion)

module.exports = router