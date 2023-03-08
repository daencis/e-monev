const Occassion = require('../models').occassion;

exports.getListOccassion =  async function (req, res, next) {
    try {
        const {totalOccassion, listOccassion} = await Occassion.findAndCountAll({
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
        const occassionDetail = await Occassion.findByPk(req.params.id);
  
        res.status(200).json({ statusCode: 200, data: {result: occassionDetail}});
    } catch (error) {
      next(error)
    }
}
exports.createOccassion =  async function (req, res, next) {
    try {
        const occassion = await Occassion.create(req.body);

        res.status(201).json({ statusCode: 200, data: occassion});
    } catch (err) {
        next(err);
    }
}

exports.updateOccassion =  async function (req, res, next) {
    try {
        const occassion = await Occassion.create(req.body);

        res.status(201).json({ statusCode: 200, data: occassion});
    } catch (err) {
        next(err); 
    }
}

exports.deleteOccassion =  async function (req, res, next) {
    try {
        const newUser = await Occassion.create(req.body);

        res.status(201).json({ statusCode: 200, data: newUser});
    } catch (err) {
        next(err); 
    }
}