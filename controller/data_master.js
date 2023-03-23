const Sequelize = require('sequelize');
const DB = require('../models')
const Models = require('../models');
const Data_master = require('../models').data_master;

exports.getListDataMaster =  async function (req, res, next) {
    try {
        const limit = (req.query.limit) ? Number(req.query.limit) : 10
        const page = (req.query.page) ? Number(req.query.page) : 1

        const search = []
        const selection = []
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
        let sort = []
        if(req.query.sort == 'terbaru'){
            sort.push(['id', 'DESC'])
        } else if(req.query.sort == 'terlama'){
            sort.push(['id', 'ASC'])
        } else if(req.query.sort == 'a-z'){
            sort.push(['description', 'ASC'])
        } else if(req.query.sort == 'z-a'){
            sort.push(['description', 'DESC'])
        }

        const filter ={
            [Sequelize.Op.and]: selection,
        }

        if(search.length > 0) filter[Sequelize.Op.or] = search

        const {count, rows} = await Data_master.findAndCountAll({
            where: filter,
            include: [
                {
                    model: Models.triwulan,
                    as: 'triwulan',
                },
                {
                    model: Models.purpose,
                    as: 'purpose',
                },
                {
                    model: Models.master_occassion,
                    as: 'occassions',
                    attributes: ['occassion_id'],
                    include: [{model: Models.occassion, as: 'occassion'}]
                },
                {
                    model: Models.organization,
                    as: 'organization',
                }
            ],
            offset: (page - 1) * limit,
            limit: limit,
            order: sort,
            distinct: true,
        });
        
        res.status(200).json({
            statusCode: 200,
            message: "Pengambilan data berhasil",
            data: {
                total: count,
                page: page,
                pages: (count == 0) ? 1 : Math.ceil(count / limit),
                result: rows
            }
        });
    } catch (error) {
      next(error)
    }
}

exports.getDetailDataMaster =  async function (req, res, next) {
    try {
        const DataMasterDetail = await Data_master.findByPk(req.params.id,{
            include: [
                {
                    model: Models.triwulan,
                    as: 'triwulan',
                },
                {
                    model: Models.program,
                    as: 'program',
                },
                {
                    model: Models.master_occassion,
                    as: 'occassions',
                    attributes: ['occassion_id'],
                    include: [{model: Models.occassion, as: 'occassion'}]
                },
                {
                    model: Models.organization,
                    as: 'organization',
                }
            ],
        });

        if(!DataMasterDetail){
            next({name: "NotFound"})
        }

        res.status(200).json({
            statusCode: 200,
            message: "Pengambilan data berhasil",
            data: {
                result: DataMasterDetail
            }
        });
    } catch (error) {
      next(error)
    }
}

exports.createDataMaster =  async function (req, res, next) {
    const transaction = await DB.sequelize.transaction()
    try {
        const newDataMaster = await Data_master.create(req.body, transaction);
        const promise = []
        if(req.body.occassions && req.body.occassions.length > 0){
            req.body.occassions.forEach(id => {
                promise.push({
                    occassion_id: id,
                    data_master_id: newDataMaster.id,
                })
            });
        }
        await Models.master_occassion.bulkCreate(promise, {
            returning: true,
            transaction: transaction
        })
        await transaction.commit()
        res.status(201).json({
            statusCode: 200,
            message: "Pembuatan data berhasil",
            data: newDataMaster
        });
    } catch (err) {
        await transaction.rollback()
        next(err);
    }
}

exports.updateDataMaster =  async function (req, res, next) {
    const transaction = await DB.sequelize.transaction()
    try {
        const dataMaster = await Data_master.findByPk(req.body.data_master_id, {transaction: transaction});

        if(!dataMaster){
            await transaction.rollback()
            next({name: "NotFound"})
        }
    
        await dataMaster.update(req.body, transaction)
        const promise = []
        if(req.body.occassions && req.body.occassions.length > 0){
            req.body.occassions.forEach(id => {
                promise.push({
                    occassion_id: id,
                    data_master_id: dataMaster.id,
                })
            });
        }
        await Models.master_occassion.destroy({
            where: {data_master_id: dataMaster.id}
        })
        await Models.master_occassion.bulkCreate(promise, {
            returning: true,
            transaction: transaction
        })
        await dataMaster.save()
        await transaction.commit()

        res.status(201).json({
            statusCode: 200,
            message: "Pengkinian data berhasil",
            data: dataMaster
        });
    } catch (err) {
        await transaction.rollback()
        next(err); 
    }
}

exports.deleteDataMaster =  async function (req, res, next) {
    try {
        const dataMaster = await Data_master.findByPk(req.body.data_master_id);

        if(!dataMaster){
            next({name: "NotFound"})
        }

        await dataMaster.destroy()

        res.status(200).json({
            statusCode: 200,
            message: "Penghapusan data berhasil",
        });
    } catch (err) {
        next(err); 
    }
}