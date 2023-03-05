const express = require('express')
const router = express.Router()
router.get('/', async (req, res) => {
  return res.send('Welcome to emonev API')
})


module.exports = router