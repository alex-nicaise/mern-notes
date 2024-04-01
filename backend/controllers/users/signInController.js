const asyncHandler = require("express-async-handler");
const { validateFields } = require("./validateUser");
const { sql } = require("../../database/db");
const bcrypt = require("bcrypt");
const { generateJWT, generateRefreshJWT } = require("../../auth/generateJWT");

const signInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    // Type check the request body
    validateFields(email, password);

    // Select user from db
    const userInDatabase =
      await sql`SELECT name, email, password FROM users WHERE email = ${email}`;

    if (userInDatabase.length < 1) {
      // Error if user does not exist
      throw new Error("User does not exist");
    }

    // Check if password is correct
    const passwordsMatch = await bcrypt.compare(
      password,
      userInDatabase[0].password
    );

    if (!passwordsMatch) {
      throw new Error("Passwords do not match");
    }

    // Generate JWT & Refresh
    const token = generateJWT(userInDatabase[0].user_id, "5d");
    const refreshToken = generateJWT(userInDatabase[0].user_id, "30d");

    res.status(200).json({
      message: "Authenticated",
      token: token,
      refresh_token: refreshToken,
      user: {
        name: userInDatabase[0].name,
        email: userInDatabase[0].email,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = { signInUser };
