const { sql, supabase } = require("../database/db");
const { z } = require("zod");

const getUser = async (req, res) => {
  try {
    const user = await sql`
    SELECT name, email
    FROM users
    WHERE id = ${req.params.id}`;
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
};

const setUser = async (req, res) => {
  const signUpSchema = z.object({
    email: z.string().email({ message: "Enter a valid email." }),
    password: z.string().min(10, "Password should be at least 10 characters."),
  });

  const validatedFields = signUpSchema.safeParse({
    email: req.body.email,
    password: req.body.password,
  });

  if (!validatedFields.success) {
    throw new Error("Invalid fields!");
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email: req.body.email,
      password: req.body.password,
    });

    if (error) {
      throw error;
    }

    res.status(200).send(data);
  } catch (error) {
    if (error.name === "AuthApiError") {
      res.status(400).send(error);
    } else {
      res.status(500).send(error);
    }
  }
};

const updateUser = (req, res) => {
  res.status(200).json({ message: `Updated user ${req.params.id}!` });
};

const deleteUser = (req, res) => {
  res.status(200).json({ message: `Deleted user ${req.params.id}!` });
};

module.exports = { getUser, setUser, updateUser, deleteUser };
