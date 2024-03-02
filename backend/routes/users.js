const express = require("express");
const {
  getUser,
  setUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");
const router = express.Router();

router
  .route("/:id")
  .get(getUser)
  .post(setUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
