import { useEffect, useState } from "react";
import useGlobalContext from "../../context/useGlobalContext";
import DashboardLayout from "./DashboardLayout";
import LostPage from "../../ui/LostPage";
import LoadingSplash from "../../ui/LoadingSplash";
import NoteEditForm from "../../ui/NoteEditForm";
import { useNavigate } from "react-router-dom";
import { getStorage } from "../../utils/localStorage";
import { userNotes } from "../../context/globalUserTypes";
import NotesSidebar from "../../ui/NotesSidebar";

const Dashboard = () => {
  const { isLoading, setIsLoading, isAuthenticated } = useGlobalContext();
  const [notes, setNotes] = useState<userNotes[]>([]);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const getNotes = async () => {
      let ignore = false;
      try {
        const url = "http://localhost:4000/api/notes/get-current/";
        const token = getStorage("token");

        if (token === null) {
          throw new Error("Authorization token not found");
        }

        const response = await fetch(url, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status !== 200) {
          throw new Error("Connection to server failed");
        }
        const { notes } = await response.json();

        if (!ignore) {
          setNotes(notes);
          setIsLoading(false);
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === "Authorization token not found") {
            setIsLoading(false);
            navigate("/");
            return;
          }
          if (!ignore) {
            setError(error.message);
            setIsLoading(false);
          }
        }
      }

      return () => {
        ignore = true;
      };
    };

    getNotes();
  }, [navigate, setIsLoading]);

  return isLoading ? (
    <LoadingSplash />
  ) : isAuthenticated === null || !isAuthenticated ? (
    <LostPage />
  ) : (
    <>
      <DashboardLayout>
        <NotesSidebar notes={notes} error={error} />
        <section
          id="main-notes-view"
          className="flex flex-col h-full bg-white dark:bg-gray-900 items-center w-full"
        >
          <div className="flex flex-col w-full h-full width-container py-16 md:py-10 px-8 sm:px-14">
            <NoteEditForm />
          </div>
        </section>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
