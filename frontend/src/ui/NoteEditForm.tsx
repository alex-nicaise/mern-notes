import { useEffect, useState } from "react";
import { userNotes } from "../context/globalUserTypes";
import Button from "./Button";
import LabelInput from "./LabelInput";

type NoteEditForm = {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  currentNote: userNotes;
};

const NoteEditForm = ({ setEditMode, currentNote }: NoteEditForm) => {
  const [editNote, setEditNote] = useState<userNotes>({} as userNotes);

  useEffect(() => {
    setEditNote(currentNote);
  }, [currentNote]);

  const handleCancelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEditMode(false);
  };

  const handleSaveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEditMode(false);
  };

  return (
    <form id="edit-form" className="w-full h-full max-w-4xl flex flex-col">
      <LabelInput
        name="title"
        type="text"
        label="Title"
        placeholder="Title"
        defaultValue={editNote.title}
      />
      <label htmlFor="note-body" className="text-sm mt-3 mb-2 block">
        Body
      </label>
      <textarea
        form="edit-form"
        name="note-body"
        className="w-full flex-grow p-3 border border-gray-300 rounded-md"
        placeholder="Jot down your thoughts..."
        defaultValue={editNote.body}
      ></textarea>
      <div className="mt-8 flex gap-3">
        <Button alt="primary" type="submit" onClick={handleSaveClick}>
          Save
        </Button>
        <Button alt="ghost" type="button" onClick={handleCancelClick}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default NoteEditForm;