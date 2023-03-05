exports.getListOccassion =  async function (req, res, next) {
    try {

        res.status(201).json({ statusCode: 200, data: newUser});
    } catch (error) {
      next(error)
    }
}

exports.getDetailOccassion =  async function (req, res, next) {
    try {
        res.status(201).json({ statusCode: 200, data: newUser});
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