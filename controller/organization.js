const Organization = require('../models').organization;
const Sequelize = require('sequelize');

exports.getListOrganization =  async function (req, res, next) {
  try {
    const limit = (req.query.limit) ? Number(req.query.limit) : 10
    const page = (req.query.page) ? Number(req.query.page) : 1

    const search = []
    const selection = [{status_id: 1}]
    if(req.query.search && req.query.search !== null && req.query.search !== undefined && req.query.search !== ''){
        search.push({'$id$': Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('id')), 'LIKE',
            `%${req.query.search.toLowerCase()}%`
        )})
        search.push({'$title$': Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('title')), 'LIKE',
            `%${req.query.search.toLowerCase()}%`
        )})
        search.push({'$code$': Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('code')), 'LIKE',
            `%${req.query.search.toLowerCase()}%`
        )})
    }
    const filter ={
        [Sequelize.Op.and]: selection,
    }

    if(search.length > 0) filter[Sequelize.Op.or] = search
    
    const {count, rows} = await Organization.findAndCountAll({
      where: filter,
      offset: (page - 1) * limit,
      limit: limit
    });

    res.status(200).json({
      statusCode: 200,
      message: "Pengambilan data berhasil",
      data: {
        total: count,
        page: page,
        pages: (count == 0) ? 1 : Math.ceil(count / limit),
        result: rows
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