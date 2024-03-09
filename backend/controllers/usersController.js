const { sql, supabase } = require("../database/db");
const { z } = require("zod");

// Create zod Schema
const signInUpFormSchema = z.object({
  email: z.string().email({ message: "Enter a valid email." }),
  password: z.string().min(10, "Password should be at least 10 characters."),
});

// Validate fields with Zod Schema
const validateFields = (email, password) => {
  const validatedFields = signInUpFormSchema.safeParse({
    email: email,
    password: password,
  });

  if (!validatedFields.success) {
    throw new Error("Invalid fields!");
  }
};

// Validate user based on action (Reusable Function)
const validateUser = async (supabaseFunction, res) => {
  try {
    const { data, error } = await supabaseFunction;

    if (error) {
      throw error;
    }

    return res.status(200).send(data);
  } catch (error) {
    if (error.name === "AuthApiError") {
      return res.status(400).send(error);
    } else {
      return res.status(500).send(error);
    }
  }
};

// Get user from database for Login
const loginUser = async (req, res) => {
  validateFields(req.body.email, req.body.password);

  return validateUser(
    supabase.auth.signInWithPassword({
      email: req.body.email,
      password: req.body.password,
    }),
    res
  );
};

// Insert user into database
const setUser = async (req, res) => {
  validateFields(req.body.email, req.body.password);

  return validateUser(
    supabase.auth.signUp({
      email: req.body.email,
      password: req.body.password,
    }),
    res
  );
};

// Update user in database
const updateUser = (req, res) => {
  res.status(200).json({ message: `Updated user ${req.params.id}!` });
};

// Delete user account
const deleteUser = (req, res) => {
  res.status(200).json({ message: `Deleted user ${req.params.id}!` });
};

module.exports = { loginUser, setUser, updateUser, deleteUser };
