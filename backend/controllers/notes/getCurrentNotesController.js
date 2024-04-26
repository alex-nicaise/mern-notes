const { sql } = require("../../database/db");
const asyncHandler = require("express-async-handler");
const { authTokens } = require("../../auth/authTokens");

const runQuery = async (userId) => {
  const notes = await sql`SELECT * FROM notes WHERE user_id = ${userId}`;
  return notes;
};

const getCurrentNotes = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const refreshToken = req.cookies["refreshToken"];

  try {
    const { newToken, userId } = authTokens(token, refreshToken);

    if (newToken !== undefined) {
      const notes = await runQuery(userId);
      res.status(200).json({ notes, newToken: newToken });
    } else {
      const notes = await runQuery(userId);
      res.status(200).json({ notes });
    }
  } catch (error) {
    if (error.message === "Not authorized. Refresh token invalid.") {
      res.clearCookie("refreshToken");
      res.status(401).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

module.exports = { getCurrentNotes };
