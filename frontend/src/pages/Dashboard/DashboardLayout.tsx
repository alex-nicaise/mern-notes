import React, { useState } from "react";
import useGlobalContext from "../../context/useGlobalContext";
import Header from "../../ui/Header";
import { FaRegEdit } from "react-icons/fa";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { sessionUser } = useGlobalContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const onSideBarToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Header sessionUser={sessionUser} onSideBarToggle={onSideBarToggle} />

      <main className="flex h-full" id="notes-main-sidebar-wrapper">
        <aside
          id="notes-list-sidebar"
          className={
            sidebarOpen
              ? "sidebar-open flex flex-col h-full bg-gray-300 text-black p-10 lg:p-10 md:py-10 md:px-5"
              : "sidebar-close flex flex-col h-full bg-gray-300 text-black p-10 lg:p-10 md:py-10 md:px-5"
          }
        >
          <h2 className="text-xl font-bold mb-8">Notes</h2>
          <ul>
            <li>
              <div className="flex border-t border-b border-gray-400 ">
                <div className="py-4 pr-4 hover:bg-gray-400">
                  <h4 className="font-bold" aria-describedby="note title">
                    Note One
                  </h4>
                  <p aria-describedby="note body">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit...
                  </p>
                </div>
                <button
                  type="button"
                  className="hover:bg-gray-400 px-4 flex flex-grow justify-center items-center"
                >
                  <FaRegEdit size={24} aria-describedby="edit button" />
                </button>
              </div>
            </li>
          </ul>
        </aside>
        <section
          id="main-notes-view"
          className={
            sidebarOpen
              ? "sidebar-open flex flex-col h-full bg-white dark:bg-gray-900 items-center w-full"
              : "sidebar-close flex flex-col h-full bg-white dark:bg-gray-900 items-center w-full"
          }
        >
          <div className="flex flex-col w-full h-full width-container py-10 px-8 sm:px-14">
            {children}
          </div>
        </section>
      </main>
    </>
  );
};

export default DashboardLayout;
