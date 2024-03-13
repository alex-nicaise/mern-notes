const express = require("express");
const { signUpUser } = require("../controllers/users/signUpController");
const { signInUser } = require("../controllers/users/signInController");
const router = express.Router();

router.route("/create").post(signUpUser);
router.route("/login").post(signInUser);

module.exports = router;
