import { createContext, useEffect, useState } from "react";
import authenticateUser from "../utils/auth";

type sessionUser = {
  id: string;
  email: string;
  notes: string[];
};

type GlobalContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  sessionUser?: sessionUser;
  setSessionUser: React.Dispatch<React.SetStateAction<sessionUser>>;
};

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionUser, setSessionUser] = useState({
    id: "",
    email: "",
    notes: [""],
  });

  useEffect(() => {
    validateUser();
  }, []);

  const validateUser = async () => {
    setIsLoading(true);
    try {
      const { message } = await authenticateUser();

      if (message) {
        setIsLoading(false);
        return setIsAuthenticated(true);
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        setIsLoading,
        sessionUser,
        setSessionUser,
      }}
    >
      {isLoading ? "" : children}
    </GlobalContext.Provider>
  );
};
