import { useEffect, useState } from "react";
import useGlobalContext from "../../context/useGlobalContext";
import DashboardLayout from "./DashboardLayout";
import LostPage from "../../ui/LostPage";
import LoadingSplash from "../../ui/LoadingSplash";
import NoteEditForm from "../../ui/NoteEditForm";
import { useNavigate } from "react-router-dom";
import { getStorage } from "../../utils/localStorage";
import { userNotes } from "../../context/globalUserTypes";

const Dashboard = () => {
  const { isLoading, setIsLoading, isAuthenticated } = useGlobalContext();
  const [notes, setNotes] = useState<userNotes[]>([]);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const getNotes = async () => {
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
        setNotes(notes);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === "Authorization token not found") {
            setIsLoading(false);
            navigate("/");
            return;
          }
          setError(error.message);
          setIsLoading(false);
        }
      }
    };

    getNotes();
  });

  return isLoading ? (
    <LoadingSplash />
  ) : isAuthenticated === null || !isAuthenticated ? (
    <LostPage />
  ) : (
    <>
      <DashboardLayout notes={notes}>
        {error}
        <NoteEditForm />
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
