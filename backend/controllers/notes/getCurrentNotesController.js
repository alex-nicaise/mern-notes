const { sql } = require("../../database/db");
const asyncHandler = require("express-async-handler");
const { verifyJWT } = require("../../auth/verifyJWT");

const getCurrentNotes = asyncHandler(async (req, res) => {
  const bearer = req.headers.authorization;
  const token = bearer.split(" ")[1];

  try {
    const userId = verifyJWT(token);

    if (userId === false) {
      throw new Error("Not authorized");
    }

    const notes = await sql`SELECT * FROM notes WHERE user_id = ${userId}`;

    return res.status(200).json({ notes });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = { getCurrentNotes };
