const express = require("express");
const {
  getCurrentNotes,
} = require("../controllers/notes/getCurrentNotesController");
const { updateNote } = require("../controllers/notes/updateNoteController");
const router = express.Router();

router.route("/get-current").get(getCurrentNotes);
router.route("/update/:id").put(updateNote);

module.exports = router;
