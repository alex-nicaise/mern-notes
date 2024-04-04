import React from "react";
import useGlobalContext from "../../context/useGlobalContext";
import Header from "../../ui/Header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { sessionUser } = useGlobalContext();

  return (
    <>
      <Header sessionUser={sessionUser} />

      <main className="flex flex-col w-full h-full bg-gray-200 dark:bg-gray-900">
        {children}
      </main>

      <aside>
        <h2>this is a sidebar</h2>
      </aside>
    </>
  );
};

export default DashboardLayout;
