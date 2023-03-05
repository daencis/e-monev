const router = require('express').Router()
const controller = require('../../controller/purpose');

router.post('/create', (req, res) => {
    return res.send('Welcome to emonev API')
})

module.exports = router