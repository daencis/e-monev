const User = require('../models').user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secretKey = process.env.SECRETKEY;

class Middleware {

  static async authentication (req, res, next) {
    try {
      let access_token, auth
      if(req.headers.authorization){
        auth = req.headers?.authorization.split("Bearer ");
        access_token = auth[1]
      }else if(req.headers.access_token) access_token = req.headers.access_token

      if(!access_token){
        throw { name: "TokenNotFound" };
      }
      const payload = jwt.verify(access_token, secretKey);
      if (!payload) throw { name: "JsonWebTokenError" };
      
      const user = await User.findOne({ username: payload.username });
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
      const user = await User.findOne({ username: payload.username });
      if (!user) throw { name: "UserNotFound" };

      const pass = req.body.password

      const cek = bcrypt.compareSync(req.body.password, user.password)
      req.user = user;
      delete req.user.password;
      
    } catch (err) {
    }
  }

}

module.exports = Middleware
