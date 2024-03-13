import { getStorage } from "../../utils/localStorage";
import { Navigate, Outlet } from "react-router-dom";

const LoggedIn = () => {
  let isAuthenticated = false;

  const user = getStorage();

  if (user !== null) {
    isAuthenticated = true;
  } else {
    isAuthenticated = false;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default LoggedIn;
