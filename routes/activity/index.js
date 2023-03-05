const routes = require('express').Router()

const getRoutes = require('./get.activity')
const postRoutes = require('./post.activity')
const patchRoutes = require('./patch.activity')

routes.use('/', getRoutes)
routes.use('/', postRoutes)
routes.use('/', patchRoutes)

module.exports = routes