const orgRouter = require('express').Router()

const getRoutes = require('./get.org')
const postRoutes = require('./post.org')
const patchRoutes = require('./patch.org')

orgRouter.use('/', getRoutes)
orgRouter.use('/', postRoutes)
orgRouter.use('/', patchRoutes)

module.exports = orgRouter