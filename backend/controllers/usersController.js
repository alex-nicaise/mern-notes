const { sql } = require("../database/db");

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

const setUser = (req, res) => {
  res.status(200).json({ message: "Set users!" });
};

const updateUser = (req, res) => {
  res.status(200).json({ message: `Updated user ${req.params.id}!` });
};

const deleteUser = (req, res) => {
  res.status(200).json({ message: `Deleted user ${req.params.id}!` });
};

module.exports = { getUser, setUser, updateUser, deleteUser };
