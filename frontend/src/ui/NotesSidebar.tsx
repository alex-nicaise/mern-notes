import { userNotes } from "../context/globalUserTypes";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import React from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { LuAlertOctagon } from "react-icons/lu";
import Button from "./Button";

type NotesSidebar = {
  notes: userNotes[];
  error?: string;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentNote: React.Dispatch<React.SetStateAction<userNotes>>;
};

const NotesSidebar = ({
  notes,
  error,
  editMode,
  setEditMode,
  setCurrentNote,
}: NotesSidebar) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = (
    openOrClose: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (openOrClose === "open") {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }
  };

  const handleClickDispatch = (
    e: React.MouseEvent<HTMLButtonElement>,
    whichButtonEvent: "edit" | "current"
  ) => {
    e.preventDefault();
    const dataIndex = Number(e.currentTarget.getAttribute("data-index"));

    if (e.currentTarget.getAttribute("data-index") === null) {
      console.log("No data index");
      return;
    } else {
      switch (whichButtonEvent) {
        case "edit":
          if (editMode === false) {
            setEditMode(true);
          }
          if (sidebarOpen === true) {
            setSidebarOpen(false);
          }
          setCurrentNote(notes[dataIndex]);
          break;
        case "current":
          if (editMode === true) {
            setEditMode(false);
          }
          if (sidebarOpen === true) {
            setSidebarOpen(false);
          }
          setCurrentNote(notes[dataIndex]);
          break;
      }
    }
  };

  return error === "" ? (
    <aside
      id="notes-list-sidebar"
      className={
        sidebarOpen
          ? "sidebar-open flex flex-col h-full bg-gray-300 text-black p-10 lg:p-10 md:py-10 md:px-5"
          : "sidebar-close flex flex-col h-full bg-gray-300 text-black p-10 lg:p-10 md:py-10 md:px-5"
      }
    >
      <div id="sidebar-button-container">
        <button
          type="button"
          id="sidebar-close"
          className="md:hidden"
          aria-describedby="close sidebar"
          onClick={(e) => toggleSidebar("close", e)}
        >
          <IoMdClose size={40} />
        </button>
        <button
          type="button"
          id="sidebar-open"
          className="md:hidden bg-gray-300 rounded-r-sm p-3"
          aria-describedby="open sidebar"
          onClick={(e) => toggleSidebar("open", e)}
        >
          <GiHamburgerMenu size={25} />
        </button>
      </div>

      <h2 className="text-xl font-bold mb-8">Notes</h2>
      <ul>
        {notes.length > 0 ? (
          notes.map((note) => {
            return (
              <li className="note-list-item" key={note?.id}>
                <div className="flex border-t border-b border-gray-400">
                  <button
                    type="button"
                    className="text-left py-4 px-4 hover:bg-gray-400 w-full"
                    onClick={(e) => handleClickDispatch(e, "current")}
                    data-index={notes.indexOf(note)}
                  >
                    <h4
                      className="font-bold"
                      aria-describedby="sidebar note title"
                    >
                      {note?.title}
                    </h4>
                    <span aria-describedby="sidebar note body">
                      {note?.body}
                    </span>
                  </button>
                  <button
                    type="button"
                    aria-describedby="edit button"
                    className="hover:bg-gray-400 px-4 flex flex-grow justify-center items-center w-28"
                    onClick={(e) => handleClickDispatch(e, "edit")}
                    data-index={notes.indexOf(note)}
                  >
                    <FaRegEdit size={24} />
                  </button>
                  <button
                    type="button"
                    aria-describedby="delete button"
                    className="hover:bg-red-600 hover:text-white px-4 flex flex-grow justify-center items-center w-28"
                    data-index={notes.indexOf(note)}
                  >
                    <FaRegTrashAlt size={24} />
                  </button>
                </div>
              </li>
            );
          })
        ) : (
          <p>
            Looks like you have no notes! Let's fix that - Click the "Create"
            Button.
          </p>
        )}
      </ul>
      <Button alt="primary" type="button" extraClasses="mt-6">
        Create
      </Button>
    </aside>
  ) : (
    <aside
      id="notes-list-sidebar"
      className={
        sidebarOpen
          ? "sidebar-open flex flex-col h-full bg-gray-300 text-black p-10 lg:p-10 md:py-10 md:px-5"
          : "sidebar-close flex flex-col h-full bg-gray-300 text-black p-10 lg:p-10 md:py-10 md:px-5"
      }
    >
      <div id="sidebar-button-container">
        <button
          type="button"
          id="sidebar-close"
          className="md:hidden"
          aria-describedby="close sidebar"
          onClick={(e) => toggleSidebar("close", e)}
        >
          <IoMdClose size={40} />
        </button>
        <button
          type="button"
          id="sidebar-open"
          className="md:hidden bg-gray-300 rounded-r-sm p-3"
          aria-describedby="open sidebar"
          onClick={(e) => toggleSidebar("open", e)}
        >
          <GiHamburgerMenu size={25} />
        </button>
      </div>

      <p aria-describedby="error" className="flex items-center text-red-700">
        <LuAlertOctagon className="inline mr-2" size={20} />
        {` ${error}. Please try reloading the page.`}
      </p>
    </aside>
  );
};

export default NotesSidebar;
