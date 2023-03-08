const userModel = require('../models/user');
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRETKEY;

class Helpers {

  static async validatePassword(password) {
    try {
      const newOrg = await orgModel.create(req.body);

      return
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Helpers
