const router = require('express').Router()
const userRoutes = require('./user/index')

router.get('/user', (req, res) => {
  res.send('Welcome to emonev API')
})

// router.use('/user', userRoutes)


module.exports = router