const router = require('express').Router()
const userRoutes = require('./user/index')
const orgRoutes = require('./organization/index')

router.get('/', (req, res) => {
  res.send('Welcome to emonev API')
})

router.use('/user', userRoutes)
router.use('/org', orgRoutes)


module.exports = router