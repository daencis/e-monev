const getRoutes = require('./get.program')
const postRoutes = require('./post.program')
const patchRoutes = require('./patch.program')

module.exports = (app) => {
    app.use('/program', getRoutes)
    app.use('/program', postRoutes)
    app.use('/program', patchRoutes)
}