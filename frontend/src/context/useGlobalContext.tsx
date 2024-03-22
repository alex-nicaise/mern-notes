import { useContext } from "react";
import { GlobalContext } from "./GlobalContextProvider";

const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }

  return context;
};

export default useGlobalContext;
