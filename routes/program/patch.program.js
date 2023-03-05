const router = require('express').Router()
const controller = require('../../controller/program');

router.patch('/update', controller.updateProgram)
router.patch('/delete', controller.deleteProgram)

module.exports = router