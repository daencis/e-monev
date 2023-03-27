const Program = require('../models').program;
const Sequelize = require('sequelize');

const generateCode = (id) => {
    const date = new Date();
    const code = `P${date.getMilliseconds()}${date.getDate()}${date.getMonth()}${id}`
    return code
}

exports.getListProgram =  async function (req, res, next) {
    try {
        const limit = (req.query.limit) ? Number(req.query.limit) : 10
        const page = (req.query.page) ? Number(req.query.page) : 1

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
        let sort = []
        if(req.query.sort == 'terbaru'){
            sort.push(['id', 'DESC'])
        } else if(req.query.sort == 'terlama'){
            sort.push(['id', 'ASC'])
        } else if(req.query.sort == 'a-z'){
            sort.push(['title', 'ASC'])
        } else if(req.query.sort == 'z-a'){
            sort.push(['title', 'DESC'])
        }

        const filter ={
            [Sequelize.Op.and]: selection,
        }

        if(search.length > 0) filter[Sequelize.Op.or] = search

        const {count, rows} = await Program.findAndCountAll({
            where: filter,
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

exports.getDetailProgram =  async function (req, res, next) {
    try {
        const programDetail = await Program.findByPk(req.params.id, {where: {status_id: 1}});

        if(!programDetail){
            return next({name: "NotFound"})
        }

        res.status(200).json({
            statusCode: 200,
            message: "Pengambilan data berhasil",
            data: {
                result: programDetail
            }
        });
    } catch (error) {
      next(error)
    }
}

exports.createProgram =  async function (req, res, next) {
    try {
        //generate code
        const programs = await Program.count()
        req.body.code = generateCode(programs)

        const newProgram = await Program.create(req.body);

        res.status(201).json({
            statusCode: 200,
            message: "Pembuatan data berhasil",
            data: newProgram
        });
    } catch (err) {
        next(err);
    }
}

exports.updateProgram =  async function (req, res, next) {
    try {
        const program = await Program.findByPk(req.body.program_id);

        if(!program){
            return next({name: "NotFound"})
        }
    
        await program.update(req.body)
        await program.save()

        res.status(201).json({
            statusCode: 200,
            message: "Pengkinian data berhasil",
            data: program
        });
    } catch (err) {
        next(err); 
    }
}

exports.deleteProgram =  async function (req, res, next) {
    try {
        const program = await Program.findByPk(req.body.program_id);

        if(!program){
            return next({name: "NotFound"})
        }

        await program.update({status_id: 3})
        await program.save()

        res.status(200).json({
            statusCode: 200,
            message: "Penghapusan data berhasil",
        });
    } catch (err) {
        next(err); 
    }
}