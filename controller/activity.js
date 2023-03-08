const Activity = require('../models').activity;

exports.getListActivity =  async function (req, res, next) {
    try {
        const {totalActivity, listActivity} = await Activity.findAndCountAll({
            offset: req.query.offset,
            limit: req.query.limit,
        });

        res.status(200).json({ statusCode: 200, data: {total: totalActivity, result: listActivity}});
    } catch (error) {
      next(error)
    }
}

exports.getDetailActivity =  async function (req, res, next) {
    try {
        const activityDetail = await Activity.findByPk(req.params.id);
  
        res.status(200).json({ statusCode: 200, data: {result: activityDetail}});
    } catch (error) {
      next(error)
    }
}

exports.createActivity =  async function (req, res, next) {
    try {
        const newactivity = await Activity.create(req.body);

        res.status(201).json({ statusCode: 200, data: newactivity});
    } catch (err) {
        next(err); 
    }
}

exports.updateActivity =  async function (req, res, next) {
    try {
        const updateActivity = await Activity.create(req.body);

        res.status(201).json({ statusCode: 200, data: updateActivity});
    } catch (err) {
        next(err); 
    }
}

exports.deleteActivity =  async function (req, res, next) {
    try {
        const deleteActivity = await Activity.findByPk(req.body.activity_id);

        res.status(200).json({ statusCode: 200, data: deleteActivity});
    } catch (err) {
        next(err); 
    }
}