const getRoutes = require('./get.report')
const postRoutes = require('./post.report')
const patchRoutes = require('./patch.report')

module.exports = (app) => {
    app.use('/data-report', getRoutes)

    app.use('/data-report', postRoutes)
    
    app.use('/data-report', patchRoutes)
}