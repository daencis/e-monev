const Purpose = require('../models').purpose;

exports.getListPurpose =  async function (req, res, next) {
    try {
      const {totalPurpose, listPurpose} = await Purpose.findAndCountAll({
        offset: req.query.offset,
        limit: req.query.limit,
      });
  
      return res.status(200).json({ statusCode: 200, data: {total: totalPurpose, result: listPurpose}});
    } catch (error) {
      next(error)
    }
}

exports.getDetailPurpose =  async function (req, res, next) {
    try {
      const purposeDetail = await Purpose.findByPk(req.params.id);
  
      return res.status(200).json({ statusCode: 200, data: {result: purposeDetail}});
    } catch (error) {
      next(error)
    }
}
exports.createPurpose =  async function (req, res, next) {
  try {
    const newPurpose = await Purpose.create(req.body);

    return res.status(201).json({ statusCode: 200, data: newPurpose});
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

      return res.status(201).json({ statusCode: 200, data: newUser});
  } catch (err) {
      next(err); 
  }
}

exports.deletePurpose =  async function (req, res, next) {
  try {
    const newPurpose = await Purpose.findByPk(req.body.purpose_id);

    return res.status(201).json({ statusCode: 200, data: newPurpose});
  } catch (err) {
    next(err); 
  }
}