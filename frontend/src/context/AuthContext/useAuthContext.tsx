import { useContext } from "react";
import { AuthContext } from "./AuthContextProvider";

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }

  return context;
};

export default useAuthContext;
