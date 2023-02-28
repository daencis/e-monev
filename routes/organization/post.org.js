const postOrg = require('express').Router()
const controller = require('../../controller/organization')

postOrg.post('/create', controller.createOrg)

module.exports = postOrg