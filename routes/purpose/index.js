const getRoutes = require('./get.purpose')
const postRoutes = require('./post.purpose')
const patchRoutes = require('./patch.purpose')

module.exports = (app) => {
    app.use('/purpose', getRoutes)
    app.use('/purpose', postRoutes)
    app.use('/purpose', patchRoutes)
}