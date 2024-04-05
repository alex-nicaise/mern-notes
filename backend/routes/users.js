const express = require("express");
const { signUpUser } = require("../controllers/users/signUpController");
const { signInUser } = require("../controllers/users/signInController");
const { logOutUser } = require("../controllers/users/logOutController");
const {
  authenticateUser,
} = require("../controllers/users/authenticateUserController");
const router = express.Router();

router.route("/create").post(signUpUser);
router.route("/login").post(signInUser);
router.route("/logout").post(logOutUser);
router.route("/authenticate").post(authenticateUser);

module.exports = router;
