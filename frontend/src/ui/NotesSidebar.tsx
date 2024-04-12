import { FaRegEdit } from "react-icons/fa";
import { userNotes } from "../context/globalUserTypes";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

const NotesSidebar = ({
  notes,
  error,
}: {
  notes: userNotes[];
  error?: string;
}) => {
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
        {notes.map((note) => {
          return (
            <li className="note-list-item" key={note?.id}>
              <div className="flex border-t border-b border-gray-400">
                <div className="py-4 px-4 hover:bg-gray-400 w-full">
                  <h4 className="font-bold" aria-describedby="note title">
                    {note?.title}
                  </h4>
                  <p aria-describedby="note body">{note?.body}</p>
                </div>
                <button
                  type="button"
                  aria-describedby="edit button"
                  className="hover:bg-gray-400 px-4 flex flex-grow justify-center items-center w-28"
                >
                  <FaRegEdit size={24} aria-describedby="edit button" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
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
      <button onClick={(e) => toggleSidebar("open", e)}>OPEN</button>
      <button onClick={(e) => toggleSidebar("close", e)}>X</button>

      <p aria-describedby="error">{error}</p>
    </aside>
  );
};

export default NotesSidebar;
