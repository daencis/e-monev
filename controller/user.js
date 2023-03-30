const User = require('../models').user;
const Status = require('../models').status;
const Sequelize = require('sequelize');
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
    delete payloadClient.dataValues.password

    const access_token = jwt.sign(payload, secretKey)

    return res.status(200).json({ statusCode: 200, access_token, payloadClient })
  } catch (error) {
    next(error)
  }
}

exports.getListUser =  async function (req, res, next) {
  try {
    const limit = (req.query.limit) ? Number(req.query.limit) : 10
    const page = (req.query.page) ? Number(req.query.page) : 1
    const search = []
    const selection = [{status_id: 1}]
    if(req.query.search && req.query.search !== null && req.query.search !== undefined && req.query.search !== ''){
        search.push({'$id$': Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('id')), 'LIKE',
            `%${req.query.search.toLowerCase()}%`
        )})
        search.push({'$username$': Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('username')), 'LIKE',
            `%${req.query.search.toLowerCase()}%`
        )})
        search.push({'$name$': Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE',
            `%${req.query.search.toLowerCase()}%`
        )})
    }
    let sort = []
    if(req.query.sort == 'terbaru'){
      sort.push(['id', 'DESC'])
    } else if(req.query.sort == 'terlama'){
        sort.push(['id', 'ASC'])
    } else if(req.query.sort == 'a-z'){
        sort.push(['username', 'ASC'])
    } else if(req.query.sort == 'z-a'){
        sort.push(['username', 'DESC'])
    } else {
      sort.push(['id', 'DESC'])
    }
    const filter ={
        [Sequelize.Op.and]: selection,
    }
    if(search.length > 0) filter[Sequelize.Op.or] = search
    const {count, rows} = await User.findAndCountAll({
      where: filter,
      offset: (page - 1) * limit,
      limit: limit,
      order: sort,
    });

    res.status(200).json({
      statusCode: 200, 
      message: "Pengambilan data berhasil",
      data: {
        total: count,
        page: page,
        pages: (count == 0) ? 1 : Math.ceil(count / limit),
        result: rows
      }
    });
  } catch (error) {
    next(error)
  }
}

exports.getDetailUser =  async function (req, res, next) {
  try {
    const user = await User.findByPk(req.user.id, {
      where: {status_id: 1},
      attributes: {exclude: ['password']},
      include: [
        {
          model: Models.status,
          as: 'status',
        },
        {
          model: Models.admin_role,
          as: 'admin_role',
        }
      ]
    });

    return res.status(201).json({
      statusCode: 200,
      message: "Pengambilan data berhasil",
      data: user
    });
  } catch (error) {
    next(error)
  }
}

exports.getUserDetail =  async function (req, res, next) {
  try {
    const user = await User.findByPk(req.params.id, {
      where: {status_id: 1},
      attributes: {exclude: ['password']},
      include: [
        {
          model: Models.status,
          as: 'status',
        },
        {
          model: Models.admin_role,
          as: 'admin_role',
        }
      ]
    });

    return res.status(201).json({
      statusCode: 200,
      message: "Pengambilan data berhasil",
      data: user
    });
  } catch (error) {
    next(error)
  }
}

exports.createUser =  async function (req, res, next) {
  try {
    if(!req.body.status_id) req.body.status_id = 1
    if(!req.body.admin_role_id) req.body.admin_role_id = 2
    
    const newUser = await User.create(req.body);

    res.status(201).json({
      statusCode: 200,
      message: "Pembuatan data berhasil",
      data: newUser
    });
  } catch (err) {
    next(err);
  }
}

exports.updateUser =  async function (req, res, next) {
  try {
    const user = await User.findByPk(req.body.user_id);

    if(!user){
      next({name: "NotFound"})
    }

    await user.update(req.body)

    delete user.dataValues.password
    return res.status(201).json({
      statusCode: 200,
      message: "Pengkinian data berhasil",
      data: user
    });
  } catch (err) {
      next(err); 
  }
}

exports.deleteUser =  async function (req, res, next) {
  try {
      const user = await User.findByPk(req.body);

      if(!user){
        next({name: "NotFound"})
      }
  
      await user.update({status_id: 3})
      await user.save()

      res.status(201).json({ statusCode: 200,  message: "Penghapusan data berhasil"});
  } catch (err) {
      next(err); 
  }
}