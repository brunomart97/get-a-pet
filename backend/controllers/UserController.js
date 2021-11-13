const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helpers
const createUserToken = require('../helpers/CreateUserToken');
const getToken = require('../helpers/getToken');
const getUserByToken = require('../helpers/getUserByToken');

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

  // Searching user by ID
  static async getUserById(req, res) {
    const id = req.params.id;
    const user = await User.findById(id).select("-password");

    if(!user) {
      res.status(422)
      .json({
        message: 'Usuário não encontrado!'
      });
      return;
    }

    res.status(200).json({ user });
  }

  // Edit users
  static async editUser(req, res) {
    const id = req.params.id;

    // Check user exists
    const token = getToken(req);
    const user = await getUserByToken(token);

    const {
      name,
      email,
      phone,
      password,
      confirmPassword
    } = req.body;
    let image = '';

    // Validations
    if(!name) {
      res.status(422)
      .json({
        message: 'O nome é obrigatório'
      });
      return;
    }

    user.name = name;

    if(!email) {
      res.status(422)
      .json({
        message: 'O e-mail é obrigatório'
      });
      return;
    }

    // Check if email has already taken
    const userExists = await User.findOne({email: email});

    if(user.email !== email && userExists) {
      res.status(422)
      .json({
        message: 'Por favor, utilize outro e-mail!'
      });
      return;
    }

    user.email = email;

    if(!phone) {
      res.status(422)
      .json({
        message: 'O telefone é obrigatório'
      });
      return;
    }

    user.phone = phone;

    if(password != confirmPassword) {
      res.status(422)
      .json({
        message: 'As senhas não conferem!'
      });
      return;

    } else if(password === confirmPassword && password != null) {
      // Creating new password
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);
      
      user.password = passwordHash;
    }
    
    try {
      // Return user updated data
      await User.findOneAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true }
      );

      res.status(200)
      .json({
        message: 'Usuário atualizado com sucesso!'
      });

    } catch (error) {
      res.status(500)
      .json({
        message: error
      });
      return;
    }
  }
}