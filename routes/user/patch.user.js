const router = require('express').Router()
const controller = require('../../controller/user');

router.patch('/update', controller.updateUser)
router.patch('/delete', controller.deleteUser)

module.exports = router