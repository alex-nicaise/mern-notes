import useAuthContext from "../../context/useGlobalContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;

  //TODO: STOP MAKING DASHBOARD AND SIGN IN PING BACK AND FORTH
};

export default ProtectedRoutes;
