const Organization = require('../models').organization;

exports.getListOrganization =  async function (req, res, next) {
  try {
    const {totalOrganization, listOrganization} = await Organization.findAndCountAll({
      offset: req.query.offset,
      limit: req.query.limit,
    });

    res.status(200).json({ statusCode: 200, data: {total: totalOrganization, result: listOrganization}});
  } catch (error) {
    next(error)
  }
}

exports.getDetailOrganization =  async function (req, res, next) {
  try {
    const organizationDetail = await Organization.findByPk(req.params.id);
  
    res.status(200).json({ statusCode: 200, data: {result: organizationDetail}});
  } catch (error) {
    next(error)
  }
}
exports.createOrganization =  async function (req, res, next) {
  try {
    const newOrganization = await Organization.create(req.body);

    res.status(201).json({ statusCode: 200, data: newOrganization});
  } catch (err) {
    next(err);
  }
}

exports.updateOrganization =  async function (req, res, next) {
  try {
    const oragnization = await Organization.create(req.body);

    res.status(201).json({ statusCode: 200, data: oragnization});
  } catch (err) {
      next(err); 
  }
}

exports.deleteOrganization =  async function (req, res, next) {
  try {
    const organization = await req.app.settings.db.models.organization.create(req.body);

    res.status(201).json({ statusCode: 200, data: organization});
  } catch (err) {
      next(err); 
  }
}