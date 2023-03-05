const router = require('express').Router()
const controller = require('../../controller/occassion');

router.patch('/update', controller.updateOccassion)
router.patch('/delete', controller.deleteOccassion)

module.exports = router