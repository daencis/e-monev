module.exports = (app) => {
  app.get('/', async (req, res) => {
    return res.send('Welcome to emonev API')
  })
}
