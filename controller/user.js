exports.login =  async function (req, res, next) {
      try {
        const { username, password } = req.body
        if (!username) throw { name: 'usernameRequired' }
        else if (!password) throw { name: 'PassRequired' }
  
        const user = await req.app.settings.db.models.user.findOne({ where: {username: username} })
        if (!user) throw { name: 'UserNotFound' }
  
        const validate = await user.validatePassword(password)
        if (!validate) throw { name: 'InvalidCredentials' }
  
        const payload = { username: user.username }
  
        const payloadClient = user
        delete payloadClient.password
  
        const access_token = jwt.sign(payload, secretKey)
  
        res.status(200).json({ access_token, payloadClient })
      } catch (error) {
        next(error)
      }
}

exports.addUser =  async function (req, res, next) {
  try {
    const newUser = await req.app.settings.db.models.user.create(req.body);

    res.status(201).json({ statusCode: 200, data: newUser});
  } catch (err) {
    next(err);
  }
}