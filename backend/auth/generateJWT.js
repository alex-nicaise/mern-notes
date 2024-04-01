const jwt = require("jsonwebtoken");

const generateJWT = (id, length) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: length,
  });
};

module.exports = { generateJWT };
