const getUsers = (req, res) => {
  res.status(200).json({ message: "Get users!" });
};

const setUsers = (req, res) => {
  res.status(200).json({ message: "Set users!" });
};

const updateUser = (req, res) => {
  res.status(200).json({ message: `Updated user ${req.params.id}!` });
};

const deleteUser = (req, res) => {
  res.status(200).json({ message: `Deleted user ${req.params.id}!` });
};

module.exports = { getUsers, setUsers, updateUser, deleteUser };
