const jwt = require("jsonwebtoken");
const { verifyJWT } = require("../../auth/verifyJWT");
const { generateJWT } = require("../../auth/generateJWT");
const { sql } = require("../../database/db");
const asyncHandler = require("express-async-handler");

// Authenticates based on JWT verification
const authenticateUser = asyncHandler(async (req, res) => {
  const bearer = req.headers.authorization;
  const token = bearer.split(" ")[1];
  const refreshToken = req.cookies["refreshToken"];

  const userDecoded = verifyJWT(token);
  const refreshTokenDecoded = verifyJWT(refreshToken);

  try {
    if (refreshTokenDecoded === false) {
      res.clearCookie("refreshToken");
      throw new Error("Not authorized");
    }

    if (userDecoded === false && refreshTokenDecoded !== false) {
      // Generate new token. The decoded user id is passed as first parameter.
      const newToken = generateJWT(
        refreshTokenDecoded,
        `${60_000 * 15}` /* 15 minutes */
      );
      res
        .status(200)
        .json({ message: "User authenticated", newToken: newToken });
    }

    res.status(200).json({ message: "User authenticated" });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = { authenticateUser };
