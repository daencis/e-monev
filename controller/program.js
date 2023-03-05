exports.getListProgram =  async function (req, res, next) {
    try {

        res.status(201).json({ statusCode: 200, data: newUser});
    } catch (error) {
      next(error)
    }
}

exports.getDetailProgram =  async function (req, res, next) {
    try {
        res.status(201).json({ statusCode: 200, data: newUser});
    } catch (error) {
      next(error)
    }
}
exports.createProgram =  async function (req, res, next) {
    try {
        const newUser = await req.app.settings.db.models.program.create(req.body);

        res.status(201).json({ statusCode: 200, data: newUser});
    } catch (err) {
        next(err);
    }
}

exports.updateProgram =  async function (req, res, next) {
    try {
        const newUser = await req.app.settings.db.models.program.create(req.body);

        res.status(201).json({ statusCode: 200, data: newUser});
    } catch (err) {
        next(err); 
    }
}

exports.deleteProgram =  async function (req, res, next) {
    try {
        const newUser = await req.app.settings.db.models.program.create(req.body);

        res.status(201).json({ statusCode: 200, data: newUser});
    } catch (err) {
        next(err); 
    }
}