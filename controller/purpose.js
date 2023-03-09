const Purpose = require('../models').purpose;

exports.getListPurpose =  async function (req, res, next) {
    try {
      const {count, rows} = await Purpose.findAndCountAll({
        offset: Number(req.query.offset) || 0,
        limit: Number(req.query.limit) || 10,
      });
  
      return res.status(200).json({
        statusCode: 200,
        message: "Pengambilan data berhasil",
        data: {
          total: count,
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