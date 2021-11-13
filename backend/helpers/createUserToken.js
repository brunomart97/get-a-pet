const jwt = require('jsonwebtoken');

const createUserToken = async (user, req,res) => {
  // Create a token
  const token = jwt.sign({
    name: user.name,
    id: user._id
  }, "mysecret");

  //Return token
  res.status(200).json({
    messsage: "Você está autenticado!",
    token: token,
    userId: user._id
  });


}

module.exports = createUserToken;