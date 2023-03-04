const routes = require('express').Router()

const getRoutes = require('./get.user')
const postRoutes = require('./post.user')
console.log("user route");
console.log("user sini");
routes.use('/', getRoutes)
routes.use('/', postRoutes)

module.exports = routes