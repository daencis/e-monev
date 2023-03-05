const router = require('express').Router();
const controller = require('../../controller/user');
const { body, validationResult, checkSchema } = require('express-validator');
router.post('/login', controller.login)
router.post(
    '/register',
    checkSchema({
        username: {

        },
        password: {
            isLength: {
                errorMessage: 'Password minimal mempunyai 8 karakter',
                options: { min: 8 },
            },
        },
        name: {
            default: null
        },
        organization_id: {
            default: null
        },
        admin_role_id: {
            default: 2
        },
        status_id: {
            default: 1
        },
    }),
    controller.createUser
    )

module.exports = router