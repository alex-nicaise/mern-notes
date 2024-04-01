const express = require("express");
const router = express.Router();
const {
  getCurrentNotes,
} = require("../controllers/notes/getCurrentNotesController");

router.route("/get-current").post(getCurrentNotes);

module.exports = router;
