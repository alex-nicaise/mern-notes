const asyncHandler = require("express-async-handler");
const { authTokens } = require("../../auth/authTokens");

// Authenticates based on JWT verification
const authenticateUser = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const refreshToken = req.cookies["refreshToken"];

  try {
    const { newToken, message } = authTokens(token, refreshToken);

    if (newToken !== undefined) {
      res.status(200).json({ message: message, newToken: newToken });
    } else {
      res.status(200).json({ message: message });
    }
  } catch (error) {
    if (error.message === "Not authorized. Refresh token invalid.") {
      res.clearCookie("refreshToken");
      res.status(401).json({ error: error.message });
    } else {
      res.status(401).json({ error: error.message });
    }
  }
});

module.exports = { authenticateUser };
