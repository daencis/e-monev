const getRoutes = require('./get.user')
const postRoutes = require('./post.user')
const patchRoutes = require('./patch.user')

module.exports = (app) => {
    app.use('/user', getRoutes)

    app.use('/user', postRoutes)
    
    app.use('/user', patchRoutes)
}
  