import React from "react";
import LogOut from "../../ui/LogOut";
import useGlobalContext from "../../context/useGlobalContext";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { sessionUser } = useGlobalContext();

  return (
    <>
      <div>
        <h1>
          Hello,{" "}
          {sessionUser?.name !== null ? sessionUser?.name : sessionUser?.email}
        </h1>
        <LogOut />
      </div>
      {children}
      <aside>
        <h2>this is a sidebar</h2>
      </aside>
    </>
  );
};

export default DashboardLayout;
