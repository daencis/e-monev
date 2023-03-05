const router = require('express').Router()
const controller = require('../../controller/user');

router.get('/profile', (req, res) => {
    return res.send('Welcome to emonev API')
})

router.get('/list', (req, res) => {
    return res.send('Welcome to emonev API')
})

router.get('/detail/:id', (req, res) => {
    return res.send('Welcome to emonev API')
})

module.exports = router