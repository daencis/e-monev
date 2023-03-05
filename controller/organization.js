exports.getListOrganization =  async function (req, res, next) {
  try {
    const {totalOrganization, listOrganization} = await req.app.settings.db.models.occassion.findAndCountAll({
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
    const organizationDetail = await req.app.settings.db.models.organization.findByPk(req.params.id);
  
    return res.status(200).json({ statusCode: 200, data: {result: organizationDetail}});
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