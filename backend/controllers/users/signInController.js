const asyncHandler = require("express-async-handler");
const { validateFields } = require("./validateUser");
const { sql } = require("../../database/db");
const bcrypt = require("bcrypt");
const { generateJWT } = require("../../auth/generateJWT");

const signInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    // Type check the request body
    validateFields(email, password);

    // Select user from db
    const userInDatabase =
      await sql`SELECT user_id, name, email, password FROM users WHERE email = ${email}`;

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
    const token = generateJWT(
      userInDatabase[0].user_id,
      `${60_000 * 15}` /* 15 minutes */
    );
    const refreshToken = generateJWT(userInDatabase[0].user_id, "10d");

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
    });
    res.status(200).json({
      message: "Authenticated",
      token: token,
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
