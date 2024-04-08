import { useEffect } from "react";
import useGlobalContext from "../../context/useGlobalContext";
import DashboardLayout from "./DashboardLayout";
import LostPage from "../../ui/LostPage";
import LoadingSplash from "../../ui/LoadingSplash";

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
        <h3>This is my content</h3>
        <p>Hello from notes!</p>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
