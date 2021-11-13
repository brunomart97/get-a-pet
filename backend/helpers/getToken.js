const getToken = (req) => {
  // Extracting token from headers
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1]; // Separating the string at each space, and taking the second position

  return token;
}

module.exports = getToken;