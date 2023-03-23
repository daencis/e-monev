const Sequelize = require('sequelize');
const Models = require('../models');
const Data_report = require('../models').data_report;

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

        const {count, rows} = await Data_report.findAndCountAll({
            where: filter,
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
                    model: Models.occassion,
                    as: 'occassion',
                },
                {
                    model: Models.organization,
                    as: 'organization',
                }
            ],
            offset: (page - 1) * limit,
            limit: limit,
            order: sort,
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

exports.getDetailDataReport =  async function (req, res, next) {
    try {
        const DataReportDetail = await Data_report.findByPk(req.params.id, {
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
                    model: Models.occassion,
                    as: 'occassion',
                },
                {
                    model: Models.organization,
                    as: 'organization',
                }
            ],
        });

        if(!DataReportDetail){
            next({name: "NotFound"})
        }

        res.status(200).json({
            statusCode: 200,
            message: "Pengambilan data berhasil",
            data: {
                result: DataReportDetail
            }
        });
    } catch (error) {
      next(error)
    }
}

exports.createDataReport =  async function (req, res, next) {
    try {
        const newDataReport = await Data_report.create(req.body);

        res.status(201).json({
            statusCode: 200,
            message: "Pembuatan data berhasil",
            data: newDataReport
        });
    } catch (err) {
        next(err);
    }
}

exports.updateDataReport =  async function (req, res, next) {
    try {
        const dataReport = await Data_report.findByPk(req.body.data_report_id);

        if(!dataReport){
            next({name: "NotFound"})
        }
    
        await dataReport.update(req.body)
        await dataReport.save()

        res.status(201).json({
            statusCode: 200,
            message: "Pengkinian data berhasil",
            data: dataReport
        });
    } catch (err) {
        next(err); 
    }
}

exports.deleteDataReport =  async function (req, res, next) {
    try {
        const dataReport = await Data_report.findByPk(req.body.data_report_id);

        if(!dataReport){
            next({name: "NotFound"})
        }

        await dataReport.destroy()

        res.status(200).json({
            statusCode: 200,
            message: "Penghapusan data berhasil",
        });
    } catch (err) {
        next(err); 
    }
}