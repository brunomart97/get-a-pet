const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helpers
const createUserToken = require('../helpers/CreateUserToken');
const getToken = require('../helpers/getToken');

module.exports = class UserController {
  // Register
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

  // Login
  static async login(req, res) {
    const {
      email,
      password
    } = req.body;

    // Validations
    if(!email) {
      res.status(422)
      .json({
        message: 'O e-mail é obrigatório'
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

    // Check if user exists
    const user = await User.findOne({ email: email });

    if(!user) {
      res.status(422)
      .json({
        message: 'Não há usuário cadastrado com este e-mail!'
      });
      return;
    }

    // Check if password match with db password
    const checkPassword = await bcrypt.compare(password, user.password);

    if(!checkPassword) {
      res.status(422)
      .json({
        message: 'Senha inválida!'
      });
      return;
    }

    await createUserToken(user, req, res);
  }

  // Checking user
  static async checkUser(req, res) {
    let currentUser;

    if(req.headers.authorization) {
      const token = getToken(req);
      const decodedToken = jwt.verify(token, "mysecret");

      currentUser = await User.findById(decodedToken.id);

      currentUser.password = undefined;
    } else {
      currentUser = null;
    }

    res.status(200).send(currentUser);
  }
}