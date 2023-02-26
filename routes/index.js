const router = require('express').Router()
const loginRoutes = require('./user')

router.get('/', (req, res) => {
  res.send('Welcome to emonev API')
})

router.use(loginRoutes)


module.exports = router