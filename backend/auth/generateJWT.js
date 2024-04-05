const jwt = require("jsonwebtoken");

const generateJWT = (id, length) => {
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: length,
  });
  return token;
};

module.exports = { generateJWT };
