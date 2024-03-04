const { sql, supabase } = require("../database/db");

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
  try {
    const { data, error } = await supabase.auth.signUp({
      email: req.body.email,
      password: req.body.password,
    });

    console.log(data, error);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateUser = (req, res) => {
  res.status(200).json({ message: `Updated user ${req.params.id}!` });
};

const deleteUser = (req, res) => {
  res.status(200).json({ message: `Deleted user ${req.params.id}!` });
};

module.exports = { getUser, setUser, updateUser, deleteUser };
