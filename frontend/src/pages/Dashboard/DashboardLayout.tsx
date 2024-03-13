import React from "react";
import LogOut from "../../ui/LogOut";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>
        <h1>This is a header</h1>
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
