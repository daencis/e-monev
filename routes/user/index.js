const routes = require('express').Router()

const getRoutes = require('./get.user')
const postRoutes = require('./post.user')

routes.use('/', getRoutes)
routes.use('/', postRoutes)

module.exports = routes