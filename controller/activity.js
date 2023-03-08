const Activity = require('../models').activity;

exports.getListActivity =  async function (req, res, next) {
    try {
        const {totalActivity, listActivity} = await Activity.findAndCountAll({
            offset: Number(req.query.offset) || 0,
            limit: Number(req.query.limit) || 10,
        });

        res.status(200).json({
            statusCode: 200,
            message: "Pengambilan data berhasil",
            data: {
                total: totalActivity,
                result: listActivity
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