const routes = require('express').Router()

const getRoutes = require('./get.user')
const postRoutes = require('./post.user')
const patchRoutes = require('./patch.user')

routes.use('/', getRoutes)
routes.use('/', postRoutes)
routes.use('/', patchRoutes)

module.exports = routes