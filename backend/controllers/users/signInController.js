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
      await sql`SELECT user_id, email, password FROM users WHERE email = ${email}`;

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
    const token = generateJWT(userInDatabase[0].user_id);
    const refreshToken = generateRefreshJWT(userInDatabase[0].user_id);

    res.status(200).send({
      message: "Authenticated",
      token: token,
      refresh_token: refreshToken,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = { signInUser };
