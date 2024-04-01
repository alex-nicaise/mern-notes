const { sql } = require("../../database/db");
const asyncHandler = require("express-async-handler");

const getCurrentNotes = asyncHandler(async (req, res) => {
  const { id } = req.body;

  try {
    const notes = await sql`SELECT * FROM notes WHERE user_id = ${id}`;

    if (notes.length < 1) {
      throw new Error("No notes found");
    }

    return res.status(200).json({ notes });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = { getCurrentNotes };
