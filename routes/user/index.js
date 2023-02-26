const userRouter = require('express').Router()

const getRoutes = require('./get.user')
const postRoutes = require('./post.user')

userRouter.use('/get', getRoutes)
userRouter.use('/post', postRoutes)

module.exports = userRouter