const express = require("express");
const {
  getUsers,
  setUsers,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");
const router = express.Router();

router.route("/").get(getUsers).post(setUsers);

router.route("/:id").put(updateUser).delete(deleteUser);

module.exports = router;
