const User = require('../models').user;
const Status = require('../models').status;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRETKEY;

exports.login =  async function (req, res, next) {
  try {
    const { username, password } = req.body
    if (!username) throw { name: 'usernameRequired' }
    else if (!password) throw { name: 'PassRequired' }

    const user = await User.findOne({
      where: {
        username: username
      }
    })

    if (!user) throw { name: 'UserNotFound' }
    
    const validate = bcrypt.compareSync(req.body.password, user.password)

    if (!validate) throw { name: 'InvalidCredentials' }

    const payload = user.dataValues
    let payloadClient = user
    delete payloadClient["password"]

    const access_token = jwt.sign(payload, secretKey)

    return res.status(200).json({ statusCode: 200, access_token, payloadClient })
  } catch (error) {
    next(error)
  }
}

exports.getListUser =  async function (req, res, next) {
  try {
    const search = []
    if(req.query.search && req.query.search !== '' && req.query.search !== null){
      search.push()
    }
    const {count, rows} = await User.findAndCountAll({
      where: {status_id: 1},
      offset: Number(req.query.offset) || 0,
      limit: Number(req.query.limit) || 10,
    });

    res.status(200).json({ statusCode: 200, data: {total: count, result: rows}});
  } catch (error) {
    next(error)
  }
}

exports.getDetailUser =  async function (req, res, next) {
  try {
    console.log("getDetailUser");
    const user = await User.findByPk(req.user.id, {
      where: {status_id: 1},
      attributes: {exclude: ['password']},
      include: [
        {
          model: Status,
          as: 'status',
        }
      ]
    });

    return res.status(201).json({ statusCode: 200, data: user});
  } catch (error) {
    next(error)
  }
}

exports.createUser =  async function (req, res, next) {
  try {
    const newUser = await User.create(req.body);

    res.status(201).json({ statusCode: 200, data: newUser});
  } catch (err) {
    next(err);
  }
}

exports.updateUser =  async function (req, res, next) {
  try {
    const newUser = await User.create(req.body);

    return res.status(201).json({ statusCode: 200, data: newUser});
  } catch (err) {
      next(err); 
  }
}

exports.deleteUser =  async function (req, res, next) {
  try {
      const newUser = await User.create(req.body);

      res.status(201).json({ statusCode: 200, data: newUser});
  } catch (err) {
      next(err); 
  }
}