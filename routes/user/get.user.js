const express = require('express')
const router = express.Router()

router.get('/profile', (req, res) => {
    res.send('Welcome to emonev API')
})

module.exports = router