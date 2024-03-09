const express = require("express");
const {
  loginUser,
  setUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");
const router = express.Router();

router.route("/login").post(loginUser);
router.route("/create").post(setUser);
router.route("/update").put(updateUser);
router.route("/delete").delete(deleteUser);

module.exports = router;
