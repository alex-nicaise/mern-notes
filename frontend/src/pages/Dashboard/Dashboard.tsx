import { useEffect, useState } from "react";
import useGlobalContext from "../../context/useGlobalContext";
import DashboardLayout from "./DashboardLayout";
import LostPage from "../../ui/LostPage";
import LoadingSplash from "../../ui/LoadingSplash";
import NoteEditForm from "../../ui/NoteEditForm";
import { useNavigate } from "react-router-dom";
import { userNotes } from "../../context/globalUserTypes";
import NotesSidebar from "../../ui/NotesSidebar";
import formatDate from "../../utils/formatDate";
import getNotesFromServer from "../../utils/getNotesFromServer";

const Dashboard = () => {
  const { isLoading, setIsLoading, isAuthenticated } = useGlobalContext();
  const [notes, setNotes] = useState<userNotes[]>([]);
  const [currentNote, setCurrentNote] = useState<userNotes>({} as userNotes);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const getNotesForSidebar = async () => {
      try {
        const notes = await getNotesFromServer();

        setNotes(notes);
        setCurrentNote(notes[0]);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === "Authorization token not found") {
            setIsLoading(false);
            navigate("/");
            return;
          } else {
            setError(error.message);
            setIsLoading(false);
          }
        }
      }
    };

    getNotesForSidebar();
  }, [navigate, setIsLoading]);

  return isLoading ? (
    <LoadingSplash />
  ) : isAuthenticated === null || !isAuthenticated ? (
    <LostPage />
  ) : editMode === true ? (
    <>
      <DashboardLayout>
        <NotesSidebar
          notes={notes}
          error={error}
          editMode={editMode}
          setEditMode={setEditMode}
          setCurrentNote={setCurrentNote}
        />
        <section
          id="main-notes-view"
          className="flex flex-col h-full bg-white dark:bg-gray-900 items-center w-full"
        >
          <div className="flex flex-col w-full h-full width-container py-16 md:py-10 px-8 sm:px-14">
            <NoteEditForm setEditMode={setEditMode} currentNote={currentNote} />
          </div>
        </section>
      </DashboardLayout>
    </>
  ) : (
    <DashboardLayout>
      <NotesSidebar
        notes={notes}
        error={error}
        editMode={editMode}
        setEditMode={setEditMode}
        setCurrentNote={setCurrentNote}
      />
      <section
        id="main-notes-view"
        className="flex flex-col h-full bg-white dark:bg-gray-900 items-center w-full"
      >
        <div className="flex flex-col w-full h-full width-container py-16 md:py-10 px-8 sm:px-14">
          {notes.length > 0 && currentNote && (
            <div id="current-note">
              <div className="mt-4 md:mt-0 mb-12 lg:flex lg:justify-between lg:">
                <h1
                  aria-describedby="note title"
                  className="text-3xl font-bold"
                >
                  {currentNote.title}
                </h1>
                <span
                  aria-describedby="note updated at"
                  className="mt-4 text-gray-400"
                >
                  Updated at: {formatDate(currentNote.updated_at)}
                </span>
              </div>

              <span aria-describedby="note body">{currentNote.body}</span>
            </div>
          )}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Dashboard;
