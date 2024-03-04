const express = require("express");
const {
  getUser,
  setUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");
const router = express.Router();

router.route("/").get(getUser);
router.route("/create").post(setUser);
router.route("/update").put(updateUser);
router.route("/delete").delete(deleteUser);

module.exports = router;
