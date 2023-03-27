const getRoutes = require('./get.master')
const postRoutes = require('./post.master')
const patchRoutes = require('./patch.master')

module.exports = (app) => {
    app.use('/data-master', getRoutes)

    app.use('/data-master', postRoutes)
    
    app.use('/data-master', patchRoutes)
}