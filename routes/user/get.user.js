const getRouter = require('express').Router()

getRouter.get('/', (req, res) => {
    res.send('Welcome to emonev API')
})

module.exports = getRouter