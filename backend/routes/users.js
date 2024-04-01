const express = require("express");
const { signUpUser } = require("../controllers/users/signUpController");
const { signInUser } = require("../controllers/users/signInController");
const {
  authenticateUser,
} = require("../controllers/users/authenticateUserController");
const router = express.Router();

router.route("/create").post(signUpUser);
router.route("/login").post(signInUser);
router.route("/authenticate").post(authenticateUser);

module.exports = router;
