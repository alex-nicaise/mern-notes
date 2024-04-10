import { useEffect } from "react";
import useGlobalContext from "../../context/useGlobalContext";
import DashboardLayout from "./DashboardLayout";
import LostPage from "../../ui/LostPage";
import LoadingSplash from "../../ui/LoadingSplash";
import NoteEditForm from "../../ui/NoteEditForm";

const Dashboard = () => {
  const { isLoading, setIsLoading, isAuthenticated } = useGlobalContext();

  useEffect(() => {
    setIsLoading(false);
  });

  return isLoading ? (
    <LoadingSplash />
  ) : isAuthenticated === null || !isAuthenticated ? (
    <LostPage />
  ) : (
    <>
      <DashboardLayout>
        <NoteEditForm />
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
