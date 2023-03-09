const getRoutes = require('./get.activity')
const postRoutes = require('./post.activity')
const patchRoutes = require('./patch.activity')

module.exports = (app) => {
    app.use('/activity', getRoutes)

    app.use('/activity', postRoutes)
    
    app.use('/activity', patchRoutes)
}