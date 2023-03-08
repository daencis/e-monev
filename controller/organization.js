const Organization = require('../models').organization;

exports.getListOrganization =  async function (req, res, next) {
  try {
    const {totalOrganization, listOrganization} = await Organization.findAndCountAll({
      where: {status_id: 1},
      offset: Number(req.query.offset) || 0,
      limit: Number(req.query.limit) || 10,
    });

    res.status(200).json({
      statusCode: 200,
      message: "Pengambilan data berhasil",
      data: {
        total: totalOrganization,
        result: listOrganization
      }
    });
  } catch (error) {
    next(error)
  }
}

exports.getDetailOrganization =  async function (req, res, next) {
  try {
    const organizationDetail = await Organization.findByPk(req.params.id, {
      where: {status_id: 1}
    });

    if(!organization){
      next("NotFound")
    }
  
    res.status(200).json({
      statusCode: 200,
      message: "Pengambilan data berhasil",
      data: {
        result: organizationDetail
      }
    });
  } catch (error) {
    next(error)
  }
}
exports.createOrganization =  async function (req, res, next) {
  try {
    const newOrganization = await Organization.create(req.body);

    res.status(201).json({
      statusCode: 200,
      message: "Pembuatan data berhasil",
      data: newOrganization
    });
  } catch (err) {
    next(err);
  }
}

exports.updateOrganization =  async function (req, res, next) {
  try {
    const organization = await Organization.create(req.body);

    if(!organization){
      next("NotFound")
    }

    res.status(201).json({
      statusCode: 200,
      message: "Pengkinian data berhasil",
      data: organization
    });
  } catch (err) {
      next(err); 
  }
}

exports.deleteOrganization =  async function (req, res, next) {
  try {
    const organization = await req.app.settings.db.models.organization.create(req.body);

    if(!organization){
      next("NotFound")
    }

    await organization.update({status_id: 3})
    await organization.save()

    res.status(201).json({
      statusCode: 200,
      message: "Penghapusan data berhasil",
    });
  } catch (err) {
      next(err); 
  }
}