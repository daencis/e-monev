const Activity = require('../models').activity;
const Sequelize = require('sequelize');

const generateCode = (id) => {
    const date = new Date();
    const code = `A${date.getMilliseconds()}${date.getDate()}${date.getMonth()}${id}`
    return code
}

exports.getListActivity =  async function (req, res, next) {
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
        let sort
        if(req.query.sort == 'terbaru'){
            sort = []
        } else if(req.query.sort == 'terlama'){
            sort = []
        } else if(req.query.sort == 'a-z'){
            sort = []
        } else if(req.query.sort == 'z-a'){
            sort = []
        }
        const filter ={
            [Sequelize.Op.and]: selection,
        }
        if(search.length > 0) filter[Sequelize.Op.or] = search
        const {count, rows} = await Activity.findAndCountAll({
            where: filter,
            offset: (page - 1) * limit,
            limit: limit
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

exports.getDetailActivity =  async function (req, res, next) {
    try {
        const activityDetail = await Activity.findByPk(req.params.id);
  
        res.status(200).json({
            statusCode: 200,
            message: "Pengambilan data berhasil",
            data: {
                result: activityDetail
            }
        });
    } catch (error) {
      next(error)
    }
}

exports.createActivity =  async function (req, res, next) {
    try {
        //generate code
        const activities = await Activity.count()
        req.body.code = generateCode(activities)
        const newactivity = await Activity.create(req.body);

        res.status(201).json({
            statusCode: 200,
            message: "Pembuatan data berhasil",
            data: newactivity
        });
    } catch (err) {
        next(err); 
    }
}

exports.updateActivity =  async function (req, res, next) {
    try {
        const activity = await Activity.findByPk(req.body.activity_id);

        if(!activity){
            next({name: "NotFound"})
        }
      
        await activity.update(req.body)
        await activity.save()

        res.status(201).json({
            statusCode: 200,
            message: "Pengkinian data berhasil",
            data: activity
        });
    } catch (err) {
        next(err); 
    }
}

exports.deleteActivity =  async function (req, res, next) {
    try {
        const activity = await Activity.findByPk(req.body.activity_id);

        if(!activity){
            next({name: "NotFound"})
          }
      
        await activity.destroy()

        res.status(200).json({ statusCode: 200, message: "Penghapusan data berhasil"});
    } catch (err) {
        next(err); 
    }
}