const Activity = require('../models').activity;
const Sequelize = require('sequelize');

exports.getListActivity =  async function (req, res, next) {
    try {
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
        const filter ={
            [Sequelize.Op.and]: selection,
        }
        if(search.length > 0) filter[Sequelize.Op.or] = search
        const {count, rows} = await Activity.findAndCountAll({
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
        const newactivity = await Activity.create(req.body);

        res.status(201).json({
            statusCode: 200,
            message: "Pembuatan data berhasil",
            data: newactivity
        });
    } catch (err) {
        console.log(err.name);
        console.log(err);
        next(err); 
    }
}

exports.updateActivity =  async function (req, res, next) {
    try {
        const activity = await Activity.create(req.body);

        if(!activity){
            next("NotFound")
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
            next("NotFound")
          }
      
        await activity.destroy()

        res.status(200).json({ statusCode: 200, message: "Penghapusan data berhasil"});
    } catch (err) {
        next(err); 
    }
}