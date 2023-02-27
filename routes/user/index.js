const userRouter = require('express').Router()

const getRoutes = require('./get.user')
const postRoutes = require('./post.user')

userRouter.use('/', getRoutes)
userRouter.use('/', postRoutes)

module.exports = userRouter