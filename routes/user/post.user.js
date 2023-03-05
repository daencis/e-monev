const router = require('express').Router();
const controller = require('../../controller/user');
const { body, validationResult } = require('express-validator');

router.post('/login', controller.login)
router.post('/register', controller.addUser)

module.exports = router