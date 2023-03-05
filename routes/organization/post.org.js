const postOrg = require('express').Router()
const controller = require('../../controller/organization')

postOrg.post('/create', controller.createOrganization)

module.exports = postOrg