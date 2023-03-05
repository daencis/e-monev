const router = require('express').Router()
const controller = require('../../controller/user');

router.get('/profile', controller.getDetailUser)

router.get('/list', controller.getListUser)

router.get('/detail/:id',controller.getDetailUser)

module.exports = router