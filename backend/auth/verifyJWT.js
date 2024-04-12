const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config;

const verifyJWT = (token) => {
  const checkedToken = jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err, decoded) => {
      if (err) {
        return false;
      } else {
        return decoded.id;
      }
    }
  );

  return checkedToken;
};

module.exports = { verifyJWT };
