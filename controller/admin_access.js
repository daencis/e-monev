const Sequelize = require('sequelize');
const DB = require('../models')
const Models = require('../models');
const Admin_Access = require('../models').admin_access;

exports.getAdminAccess =  async function (req, res, next) {
    try {
        const search = []
        const selection = [{user_id: req.query.user_id}]
        if(req.query.search && req.query.search !== null && req.query.search !== undefined && req.query.search !== ''){
        }

        const filter ={
            [Sequelize.Op.and]: selection,
        }

        if(search.length > 0) filter[Sequelize.Op.or] = search

        const cursor = await Admin_Access.findAll({
            where: filter,
            include: [
                {
                    model: Models.organization,
                    as: 'organization',
                },
            ],
            order: [['id', 'DESC']],
        });
        
        res.status(200).json({
            statusCode: 200,
            message: "Pengambilan data berhasil",
            data: {
                result: cursor
            }
        });
    } catch (error) {
      next(error)
    }
}

exports.createAdminAccess =  async function (req, res, next) {
    try {
        const promises = []

        req.body.organizations.forEach(id => {
            promises.push(
                Models.organization.findOne({
                    where: {
                        id: id
                    }
                })
            )
        });
        await Promise.all(promises)
        return res.status(200).json({
            statusCode: 200,
            message: "Pembuatan data berhasil",
            data: {
                result: cursor
            }
        });
    } catch (error) {
      next(error)
    }
}