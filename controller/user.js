class User {
    static async login(req, res, next) {
        try {
          const { username, password } = req.body;
          if (!username) throw { name: 'usernameRequired' };
          else if (!password) throw { name: 'PassRequired' };
    
          const user = await userModel.findOne({ username });
          if (!user) throw { name: 'UserNotFound' };
    
          const validate = await user.validatePassword(password);
          if (!validate) throw { name: 'InvalidCredentials' };
    
          const payload = { username: user.username };
    
          const payloadClient = {
            id: user._id.toString(),
            username: user.username,
          };
          if (user.imgUrl) payloadClient.imgUrl = user.imgUrl;
          if (user.header) payloadClient.header = user.header;
    
          const access_token = jwt.sign(payload, secretKey);
    
          res.status(200).json({ access_token, payloadClient });
        } catch (error) {
          next(error);
        }
      }
}