const Models = require('../models');

exports.getStaticTriwulan =  async function (req, res, next) {
    try {
      const triwulan = await Models.triwulan.findAll();
  
      return res.status(201).json({
        statusCode: 200,
        message: "Pengambilan data berhasil",
        data: triwulan
      });
    } catch (error) {
      next(error)
    }
}

exports.getStaticStatus =  async function (req, res, next) {
    try {
      const status = await Models.status.findAll();
  
      return res.status(201).json({
        statusCode: 200,
        message: "Pengambilan data berhasil",
        data: status
      });
    } catch (error) {
      next(error)
    }
}

exports.getStaticAdminRole =  async function (req, res, next) {
    try {
      const admin_role = await Models.admin_role.findAll();
  
      return res.status(201).json({
        statusCode: 200,
        message: "Pengambilan data berhasil",
        data: admin_role
      });
    } catch (error) {
      next(error)
    }
}