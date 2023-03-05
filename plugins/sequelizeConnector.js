const fs = require('fs');
const Sequelize = require('sequelize');

function plugin(app, options) {
  console.log(options);
    const instance = options.instance || 'sequelize'
    const autoConnect = options.autoConnect || true
  
    const sequelize = new Sequelize(
      options.database,
      options.username,
      options.password,
      {
        logging: options.logging,
        host: options.host,
        dialect: options.dialect,
        pool: options.pool
      }
    )
    if (autoConnect)
      return sequelize.authenticate().then(decorate())
  
    decorate()
    return Promise.resolve()
  
    function decorate() {
      // init model
      fs.readdirSync(`${__dirname}/../models`).forEach(route => {
        if(route == 'index.js'){
  
        }else require(`${__dirname}/../models/${route}`)(app, sequelize, Sequelize)
      })
  
      // init model association
      Object.keys(sequelize.models).forEach(model => {
        if (sequelize.models[model].associate) {
          sequelize.models[model].associate(sequelize.models)
        }
      })
  
      app.set(instance, sequelize)
      app.set('seq', Sequelize)
      app.use('onClose', (app, done) => {
        sequelize.close().then(done).catch(done)
      })
    }
}
  
module.exports = plugin