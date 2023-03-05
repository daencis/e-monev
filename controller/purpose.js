exports.getListPurpose =  async function (req, res, next) {
    try {

        res.status(201).json({ statusCode: 200, data: newUser});
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