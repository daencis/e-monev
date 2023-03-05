const programRouter = require('express').Router()

const getRoutes = require('./get.program')
const postRoutes = require('./post.program')
const patchRoutes = require('./patch.program')

programRouter.use('/', getRoutes)
programRouter.use('/', postRoutes)
programRouter.use('/', patchRoutes)

module.exports = programRouter