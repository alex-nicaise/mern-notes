import { sessionUser } from "../context/globalUserTypes";
import LogOut from "./LogOut";

const Header = ({ sessionUser }: { sessionUser?: sessionUser }) => {
  return (
    <header className="flex w-full dark:bg-gray-950">
      <nav className="flex w-full justify-between items-center px-10 py-5">
        <div className="flex gap-6">
          <div className="flex flex-col justify-center gap-1">
            <span className="block w-6 h-1 bg-white"></span>
            <span className="block w-6 h-1 bg-white"></span>
            <span className="block w-6 h-1 bg-white"></span>
          </div>
          <h2 className="text-2xl font-bold">Notely</h2>
        </div>
        <div className="flex items-center gap-5">
          <span>
            Hello,{" "}
            {sessionUser?.name !== null
              ? sessionUser?.name
              : sessionUser?.email}
          </span>
          <LogOut />
        </div>
      </nav>
    </header>
  );
};

export default Header;
