const router = require('express').Router()

router.post('/create', (req, res) => {
    return res.send('Welcome to emonev API')
})

module.exports = router