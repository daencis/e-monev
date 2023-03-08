const getRoutes = require('./get.org')
const postRoutes = require('./post.org')
const patchRoutes = require('./patch.org')

module.exports = (app) => {
    app.use('/org', getRoutes)
    app.use('/org', postRoutes)
    app.use('/org', patchRoutes)
}