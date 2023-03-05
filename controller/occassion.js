exports.getListOccassion =  async function (req, res, next) {
    try {
        const {totalOccassion, listOccassion} = await req.app.settings.db.models.occassion.findAndCountAll({
            offset: req.query.offset,
            limit: req.query.limit,
        });

        res.status(200).json({ statusCode: 200, data: {total: totalOccassion, result: listOccassion}});
    } catch (error) {
      next(error)
    }
}

exports.getDetailOccassion =  async function (req, res, next) {
    try {
        const occassionDetail = await req.app.settings.db.models.occassion.findByPk(req.params.id);
  
        return res.status(200).json({ statusCode: 200, data: {result: occassionDetail}});
    } catch (error) {
      next(error)
    }
}
exports.createOccassion =  async function (req, res, next) {
    try {
        const newUser = await req.app.settings.db.models.user.create(req.body);

        res.status(201).json({ statusCode: 200, data: newUser});
    } catch (err) {
        next(err);
    }
}

exports.updateOccassion =  async function (req, res, next) {
    try {
        const newUser = await req.app.settings.db.models.occassion.create(req.body);

        res.status(201).json({ statusCode: 200, data: newUser});
    } catch (err) {
        next(err); 
    }
}

exports.deleteOccassion =  async function (req, res, next) {
    try {
        const newUser = await req.app.settings.db.models.occassion.create(req.body);

        res.status(201).json({ statusCode: 200, data: newUser});
    } catch (err) {
        next(err); 
    }
}