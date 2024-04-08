import { sessionUser } from "../context/globalUserTypes";
import LogOut from "./LogOut";

const Header = ({
  sessionUser,
  onSideBarToggle,
}: {
  sessionUser?: sessionUser;
  onSideBarToggle: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <header className="flex w-full justify-center bg-gray-950 text-white">
      <nav className="flex w-full justify-between items-center px-10 py-5 width-container">
        <div className="flex gap-6">
          <button
            className="flex flex-col justify-center gap-1 md:hidden"
            onClick={(e) => onSideBarToggle(e)}
          >
            <span className="block w-6 h-1 bg-white"></span>
            <span className="block w-6 h-1 bg-white"></span>
            <span className="block w-6 h-1 bg-white"></span>
          </button>
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
