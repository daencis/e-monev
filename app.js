require("dotenv").config();
const express = require('express')
const app = express()
const port = process.env.PORT
const errorHandler = require('./middleswares/errorHandler')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = require("./models/index");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
app.use('/', require('./routes/index'))
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})