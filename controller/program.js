const Program = require('../models').program;

exports.getListProgram =  async function (req, res, next) {
    try {
        const {totalProgram, listProgram} = await Program.findAndCountAll({
            offset: req.query.offset,
            limit: req.query.limit,
            });
        
        res.status(200).json({ statusCode: 200, data: {total: totalProgram, result: listProgram}});
    } catch (error) {
      next(error)
    }
}

exports.getDetailProgram =  async function (req, res, next) {
    try {
        const programDetail = await Program.findByPk(req.params.id);
  
        res.status(200).json({ statusCode: 200, data: {result: programDetail}});
    } catch (error) {
      next(error)
    }
}
exports.createProgram =  async function (req, res, next) {
    try {
        const newProgram = await Program.create(req.body);

        res.status(201).json({ statusCode: 200, data: newProgram});
    } catch (err) {
        next(err);
    }
}

exports.updateProgram =  async function (req, res, next) {
    try {
        const program = await Program.create(req.body);

        res.status(201).json({ statusCode: 200, data: program});
    } catch (err) {
        next(err); 
    }
}

exports.deleteProgram =  async function (req, res, next) {
    try {
        const newProgram = await Program.create(req.body);

        res.status(200).json({ statusCode: 200, data: newProgram});
    } catch (err) {
        next(err); 
    }
}