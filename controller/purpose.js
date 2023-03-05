exports.getListPurpose =  async function (req, res, next) {
    try {
      const {totalPurpose, listPurpose} = await req.app.settings.db.models.purpose.findAndCountAll({
        offset: req.query.offset,
        limit: req.query.limit,
      });
  
      res.status(200).json({ statusCode: 200, data: {total: totalPurpose, result: listPurpose}});
    } catch (error) {
      next(error)
    }
}

exports.getDetailPurpose =  async function (req, res, next) {
    try {
        res.status(201).json({ statusCode: 200, data: newUser});
    } catch (error) {
      next(error)
    }
}
exports.createPurpose =  async function (req, res, next) {
  try {
    const newUser = await req.app.settings.db.models.user.create(req.body);

    res.status(201).json({ statusCode: 200, data: newUser});
  } catch (err) {
    next(err);
  }
}

exports.updatePurpose =  async function (req, res, next) {
  try {
      const newUser = await req.app.settings.db.models.purpose.create(req.body);

      res.status(201).json({ statusCode: 200, data: newUser});
  } catch (err) {
      next(err); 
  }
}

exports.deletePurpose =  async function (req, res, next) {
  try {
      const newUser = await req.app.settings.db.models.purpose.create(req.body);

      res.status(201).json({ statusCode: 200, data: newUser});
  } catch (err) {
      next(err); 
  }
}