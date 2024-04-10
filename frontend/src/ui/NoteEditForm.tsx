import Button from "./Button";
import LabelInput from "./LabelInput";

const NoteEditForm = () => {
  return (
    <form id="edit-form" className="w-full h-full max-w-4xl flex flex-col">
      <LabelInput name="title" type="text" label="Title" placeholder="Title" />
      <label htmlFor="note-body" className="text-sm mt-3 mb-2 block">
        Body
      </label>
      <textarea
        form="edit-form"
        name="note-body"
        className="w-full flex-grow p-3 border border-gray-300 rounded-md"
        placeholder="Jot down your thoughts..."
      ></textarea>
      <div className="mt-8 flex gap-3">
        <Button
          alt="primary"
          type="submit"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
          }}
        >
          Save
        </Button>
        <Button
          alt="ghost"
          type="button"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default NoteEditForm;
