const routes = require('express').Router()

const getRoutes = require('./get.purpose')
const postRoutes = require('./post.purpose')
const patchRoutes = require('./patch.purpose')

routes.use('/', getRoutes)
routes.use('/', postRoutes)
routes.use('/', patchRoutes)

module.exports = routes