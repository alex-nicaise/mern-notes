import { useEffect, useState } from "react";
import { userNotes } from "../context/globalUserTypes";
import Button from "./Button";
import LabelInput from "./LabelInput";
import fetchLink from "../utils/fetchLink";
import { getStorage } from "../utils/localStorage";

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

  const handleSaveClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const url = `http://localhost:4000/api/notes/update/${currentNote.id}`;
      const { noteTitle, noteBody } = e.currentTarget;

      const token = getStorage("token");
      if (token === null) {
        throw new Error("Authorization token not found");
      }

      const response = await fetchLink({
        url: url,
        method: "PUT",
        token: token,
        body: JSON.stringify({
          title: noteTitle.value,
          body: noteBody.value,
        }),
      });

      if (response.status !== 200) {
        const { error } = await response.json();
        throw new Error(error);
      }

      setEditMode(false);
    } catch (error) {
      console.log(error);
      setEditMode(false);
    }
  };

  return (
    <form
      id="edit-form"
      className="w-full h-full max-w-4xl flex flex-col"
      onSubmit={(e) => handleSaveClick(e)}
    >
      <LabelInput
        name="noteTitle"
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
        name="noteBody"
        className="w-full flex-grow p-3 border border-gray-300 rounded-md"
        placeholder="Jot down your thoughts..."
        defaultValue={editNote.body}
      ></textarea>
      <div className="mt-8 flex gap-3">
        <Button alt="primary" type="submit">
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
