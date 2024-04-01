const jwt = require("jsonwebtoken");
const { verifyJWT } = require("../../auth/verifyJWT");
const { sql } = require("../../database/db");
const asyncHandler = require("express-async-handler");

// Authenticates based on JWT verification
const authenticateUser = asyncHandler(async (req, res) => {
  const bearer = req.headers.authorization;
  const token = bearer.split(" ")[1];

  const userId = verifyJWT(token);

  if (userId === false) {
    res.status(401).json({ error: "Not authorized" });
  } else {
    res.status(200).json({ message: "User authenticated" });
  }
});

module.exports = { authenticateUser };
