import useGlobalContext from "../../context/useGlobalContext";
import Header from "../../ui/Header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { sessionUser } = useGlobalContext();

  return (
    <>
      <Header sessionUser={sessionUser} />

      <main className="flex h-full" id="notes-main-sidebar-wrapper">
        {children}
      </main>
    </>
  );
};

export default DashboardLayout;
