const orgRouter = require('express').Router()

const getRoutes = require('./get.org')
const postRoutes = require('./post.org')

orgRouter.use('/', getRoutes)
orgRouter.use('/', postRoutes)

module.exports = orgRouter