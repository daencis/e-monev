const Purpose = require('../models').purpose;
const Sequelize = require('sequelize');

exports.getListPurpose =  async function (req, res, next) {
    try {
      const limit = (req.query.limit) ? Number(req.query.limit) : 10
      const page = (req.query.page) ? Number(req.query.page) : 1

      const search = []
      const selection = []
      if(req.query.search && req.query.search !== null && req.query.search !== undefined && req.query.search !== ''){
          search.push({'$id$': Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('id')), 'LIKE',
              `%${req.query.search.toLowerCase()}%`
          )})
          search.push({'$title$': Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('title')), 'LIKE',
              `%${req.query.search.toLowerCase()}%`
          )})
      }
      const filter ={
          [Sequelize.Op.and]: selection,
      }

      if(search.length > 0) filter[Sequelize.Op.or] = search
      const {count, rows} = await Purpose.findAndCountAll({
        where: filter,
        offset: (page - 1) * limit,
        limit: limit
      });
  
      return res.status(200).json({
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

exports.getDetailPurpose =  async function (req, res, next) {
    try {
      const purposeDetail = await Purpose.findByPk(req.params.id);

      if(!purposeDetail){
        next("NotFound")
      }

      return res.status(200).json({
        statusCode: 200,
        message: "Pengambilan data berhasil",
        data: {
          result: purposeDetail
        }
      });
    } catch (error) {
      next(error)
    }
}
exports.createPurpose =  async function (req, res, next) {
  try {
    const newPurpose = await Purpose.create(req.body);

    return res.status(201).json({
      statusCode: 200,
      message: "Pembuatan data berhasil",
      data: newPurpose
    });
  } catch (err) {
    next(err);
  }
}

exports.updatePurpose =  async function (req, res, next) {
  try {
      const purpose = await Purpose.findByPk(req.body.purpose_id);

      if(!purpose){
        next("NotFound")
      }

      await purpose.update(req.body)
      await purpose.save()

      return res.status(201).json({
        statusCode: 200,
        message: "Pengkinian data berhasil",
        data: purpose
      });
  } catch (err) {
      next(err); 
  }
}

exports.deletePurpose =  async function (req, res, next) {
  try {
    const purpose = await Purpose.findByPk(req.body.purpose_id);

    if(!purpose){
      next("NotFound")
    }

    await purpose.destroy()

    return res.status(201).json({ statusCode: 200, message: "Penghapusan data berhasil"});
  } catch (err) {
    next(err); 
  }
}