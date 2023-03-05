exports.getListOrganization =  async function (req, res, next) {
  try {

      res.status(201).json({ statusCode: 200, data: newUser});
  } catch (error) {
    next(error)
  }
}

exports.getDetailOrganization =  async function (req, res, next) {
  try {
      res.status(201).json({ statusCode: 200, data: newUser});
  } catch (error) {
    next(error)
  }
}
exports.createOrganization =  async function (req, res, next) {
  try {
    const newUser = await req.app.settings.db.models.user.create(req.body);

    res.status(201).json({ statusCode: 200, data: newUser});
  } catch (err) {
    next(err);
  }
}

exports.updateOrganization =  async function (req, res, next) {
  try {
      const newUser = await req.app.settings.db.models.organization.create(req.body);

      res.status(201).json({ statusCode: 200, data: newUser});
  } catch (err) {
      next(err); 
  }
}

exports.deleteOrganization =  async function (req, res, next) {
  try {
      const newUser = await req.app.settings.db.models.organization.create(req.body);

      res.status(201).json({ statusCode: 200, data: newUser});
  } catch (err) {
      next(err); 
  }
}