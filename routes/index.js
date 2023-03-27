const controller = require('../controller/index')

module.exports = (app) => {
  app.get('/', async (req, res) => {
    return res.send('Welcome to emonev API')
  })
  app.get('/static/triwulan', controller.getStaticTriwulan)
  app.get('/static/status', controller.getStaticStatus)
  app.get('/static/admin-role', controller.getStaticAdminRole)
}