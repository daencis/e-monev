const userModel = require('../models/user');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secretKey = process.env.SECRETKEY;

class Middleware {

  static async authentication (req, res, next) {
    try {
      const access_token = req.headers.access_token;
      if (!access_token) throw { name: "TokenNotFound" };
  
      const payload = jwt.verify(access_token, secretKey);
      if (!payload) throw { name: "JsonWebTokenError" };
      
      const user = await req.app.settings.db.models.user.findOne({ username: payload.username });
      if (!user) throw { name: "UserNotFound" };
  
      req.user = user;
      delete req.user.password;
      
      next();
    } catch (err) {
      next(err);
    }
  }

  static async validatePassword (req, res, next) {
    try {
      console.log(res);
      console.log(next);
      const user = await req.app.settings.db.models.user.findOne({ username: payload.username });
      if (!user) throw { name: "UserNotFound" };

      const pass = req.body.password

      const cek = bcrypt.compareSync(req.body.password, user.password)
      console.log(cek);
      console.log("apani cek");
      req.user = user;
      delete req.user.password;
      
    } catch (err) {
    }
  }

}

module.exports = Middleware
