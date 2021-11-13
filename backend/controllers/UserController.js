const bcrypt = require('bcrypt');
const User = require('../models/User');

const createUserToken = require('../helpers/CreateUserToken');

module.exports = class UserController {
  static async register(req, res) {
    const {
      name,
      email,
      phone,
      password,
      confirmPassword,
    } = req.body;

    // Validations
    if(!name) {
      res.status(422)
      .json({
        message: 'O nome é obrigatório'
      });
      return;
    }

    if(!email) {
      res.status(422)
      .json({
        message: 'O e-mail é obrigatório'
      });
      return;
    }

    if(!phone) {
      res.status(422)
      .json({
        message: 'O telefone é obrigatório'
      });
      return;
    }

    if(!password) {
      res.status(422)
      .json({
        message: 'A senha é obrigatória'
      });
      return;
    }

    if(!confirmPassword) {
      res.status(422)
      .json({
        message: 'A confirmação de senha é obrigatória'
      });
      return;
    }

    // Check if password confirmation is correct
    if(password !== confirmPassword) {
      res.status(422)
      .json({
        message: 'A senha e a confirmação de senha precisam ser iguais'
      });
      return;
    }

    // Check if user exists
    const userExist = await User.findOne({ email: email });

    if(userExist) {
      res.status(422)
      .json({
        message: 'E-mail já cadastrado. Utilize outro e-mail'
      });
      return;
    }

    // Create a password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create a user
    const user = new User({
      name,
      email,
      phone,
      password: passwordHash
    });

    try {
      const newUser = await user.save();
      
      await createUserToken(newUser, req, res);
    } catch(error) {
      res.status(500).json({message: error});
    }
  }
}