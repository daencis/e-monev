const routes = require('express').Router()

const getRoutes = require('./get.occassion')
const postRoutes = require('./post.occassion')
const patchRoutes = require('./patch.occassion')

routes.use('/', getRoutes)
routes.use('/', postRoutes)
routes.use('/', patchRoutes)

module.exports = routes