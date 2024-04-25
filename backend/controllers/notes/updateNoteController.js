const asyncHandler = require("express-async-handler");

// Extract query for reuse within if/else
const runQuery = asyncHandler(async (noteId, noteTitle, noteBody) => {
  await sql`UPDATE notes SET title = ${noteTitle}, body = ${noteBody} WHERE id = ${noteId}`;
});

const updateNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const refreshToken = req.cookies["refreshToken"];

  try {
    const { newToken, message } = authTokens(token, refreshToken);

    if (newToken !== undefined) {
      runQuery(id, title, body);
      res.status(200).json({ message: message, newToken: newToken });
    } else {
      runQuery(id, title, body);
      res.status(200).json({ message: message });
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

module.exports = { updateNote };
