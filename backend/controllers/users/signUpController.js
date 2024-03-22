const asyncHandler = require("express-async-handler");
const { validateFields } = require("./validateUser");
const { sql } = require("../../database/db");
const bcrypt = require("bcrypt");

const signUpUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    // Type check the request body
    validateFields(email, password);

    // Check if user is in database
    const userInDatabase =
      await sql`SELECT * FROM users WHERE email = ${email}`;

    if (userInDatabase.length > 0) {
      // Error if user exists
      throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user into database
    const user =
      await sql`INSERT INTO users (email, password) VALUES (${email}, ${hashedPassword})`;

    if (!user) {
      // Error if user not created
      throw new Error("User not created");
    }

    res.status(200).json({ message: "User created" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = { signUpUser };
