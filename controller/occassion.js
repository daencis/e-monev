const Occassion = require('../models').occassion;
const Sequelize = require('sequelize');

exports.getListOccassion =  async function (req, res, next) {
    try {
        const search = []
        const selection = [{status_id: 1}]
        if(req.query.search && req.query.search !== null && req.query.search !== undefined && req.query.search !== ''){
            search.push({'$id$': Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('id')), 'LIKE',
                `%${req.query.search.toLowerCase()}%`
            )})
            search.push({'$title$': Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('title')), 'LIKE',
                `%${req.query.search.toLowerCase()}%`
            )})
            search.push({'$code$': Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('code')), 'LIKE',
                `%${req.query.search.toLowerCase()}%`
            )})
        }
        const filter ={
            [Sequelize.Op.and]: selection,
        }

        if(search.length > 0) filter[Sequelize.Op.or] = search
        
        const {count, rows} = await Occassion.findAndCountAll({
            where: filter,
            offset: Number(req.query.offset) || 0,
            limit: Number(req.query.limit) || 10,
        });

        res.status(200).json({
            statusCode: 200,
            message: "Pengambilan data berhasil",
            data: {
                total: count,
                result: rows
            }
        });
    } catch (error) {
      next(error)
    }
}

exports.getDetailOccassion =  async function (req, res, next) {
    try {
        const occassionDetail = await Occassion.findByPk(req.params.id,{
            where: {status_id: 1}
        });

        if(!occassionDetail){
            next("NotFound")
        }
  
        res.status(200).json({
            statusCode: 200,
            message: "Pengambilan data berhasil",
            data: {
                result: occassionDetail
            }
        });
    } catch (error) {
      next(error)
    }
}
exports.createOccassion =  async function (req, res, next) {
    try {
        const occassion = await Occassion.create(req.body);

        res.status(201).json({
            statusCode: 200,
            message: "Pembuatan data berhasil",
            data: occassion
        });
    } catch (err) {
        next(err);
    }
}

exports.updateOccassion =  async function (req, res, next) {
    try {
        const occassion = await Occassion.findByPk(req.body.occassion_id);

        if(!occassion){
            next("NotFound")
        }

        await occassion.update(req.body)
        await occassion.save()

        res.status(201).json({
            statusCode: 200,
            message: "Pengkinian data berhasil",
            data: occassion
        });
    } catch (err) {
        next(err); 
    }
}

exports.deleteOccassion =  async function (req, res, next) {
    try {
        const occassion = await Occassion.findByPk(req.body.occassion_id);

        if(!occassion){
            next("NotFound")
        }

        await occassion.update({status_id: 3})
        await occassion.save()

        res.status(201).json({ statusCode: 200, message: "Penghapusan data berhasil"});
    } catch (err) {
        next(err); 
    }
}