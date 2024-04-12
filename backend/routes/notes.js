const express = require("express");
const {
  getCurrentNotes,
} = require("../controllers/notes/getCurrentNotesController");
const router = express.Router();

router.route("/get-current").post(getCurrentNotes);

module.exports = router;
