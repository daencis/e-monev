exports.getListActivity =  async function (req, res, next) {
    try {
        const {totalActivity, listActivity} = await req.app.settings.db.models.activity.findAndCountAll({
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
        const activityDetail = await req.app.settings.db.models.activity.findByPk(req.params.id);
  
        return res.status(200).json({ statusCode: 200, data: {result: activityDetail}});
    } catch (error) {
      next(error)
    }
}

exports.createActivity =  async function (req, res, next) {
    try {
        const newactivity = await req.app.settings.db.models.activity.create(req.body);

        res.status(201).json({ statusCode: 200, data: newactivity});
    } catch (err) {
        next(err); 
    }
}

exports.updateActivity =  async function (req, res, next) {
    try {
        const updateActivity = await req.app.settings.db.models.activity.create(req.body);

        res.status(201).json({ statusCode: 200, data: updateActivity});
    } catch (err) {
        next(err); 
    }
}

exports.deleteActivity =  async function (req, res, next) {
    try {
        const deleteActivity = await req.app.settings.db.models.activity.findByPk(req.body.activity_id);

        res.status(200).json({ statusCode: 200, data: deleteActivity});
    } catch (err) {
        next(err); 
    }
}