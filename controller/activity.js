exports.getListActivity =  async function (req, res, next) {
    try {

        res.status(201).json({ statusCode: 200, data: newUser});
    } catch (error) {
      next(error)
    }
}

exports.getDetailActivity =  async function (req, res, next) {
    try {
        res.status(201).json({ statusCode: 200, data: newUser});
    } catch (error) {
      next(error)
    }
}
exports.createActivity =  async function (req, res, next) {
    try {
        const newUser = await req.app.settings.db.models.activity.create(req.body);

        res.status(201).json({ statusCode: 200, data: newUser});
    } catch (err) {
        next(err); 
    }
}