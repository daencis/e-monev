const getRoutes = require('./get.occassion')
const postRoutes = require('./post.occassion')
const patchRoutes = require('./patch.occassion')

module.exports = (app) => {
    app.use('/occassion', getRoutes)

    app.use('/occassion', postRoutes)
    
    app.use('/occassion', patchRoutes)
}