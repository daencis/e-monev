const userModel = require('../models/user');
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRETKEY;

class Middleware {

  static async authentication (req, res, next) {
    try {
      const access_token = req.headers.access_token;
      if (!access_token) throw { name: "TokenNotFound" };
  
      const payload = jwt.verify(access_token, secretKey);
      if (!payload) throw { name: "JsonWebTokenError" };
      
      const user = await userModel.findOne({ username: payload.username });
      if (!user) throw { name: "UserNotFound" };
  
      req.user = user;
      delete req.user.password;
      
      next();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Middleware
