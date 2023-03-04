const express = require('express')
const router = express.Router()
router.get('/', async (req, res) => {
  console.log("sini0");
  console.log("hmm");
  return res.send('Welcome to emonev API')
})


module.exports = router