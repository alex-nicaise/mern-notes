import { createContext, useEffect, useState } from "react";
import { sessionUser } from "./globalUserTypes";
import authenticateUser from "../utils/auth";
import { getStorage } from "../utils/localStorage";

type GlobalContextType = {
  isAuthenticated: boolean | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  sessionUser?: sessionUser;
  setSessionUser: React.Dispatch<React.SetStateAction<sessionUser | undefined>>;
};

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionUser, setSessionUser] = useState<sessionUser | undefined>();

  useEffect(() => {
    validateUserforContext();
  }, []);

  const validateUserforContext = async () => {
    setIsLoading(true);
    try {
      const { message } = await authenticateUser();

      if (message !== "User authenticated") {
        throw new Error("User not authenticated");
      }

      if (getStorage("user") === null) {
        throw new Error("No user found in local storage");
      }

      const user = getStorage("user");

      if (user !== null) {
        setSessionUser((prev) => ({
          ...prev,
          email: JSON.parse(user).email,
          name: JSON.parse(user).name,
        }));
      }

      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
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
      {children}
    </GlobalContext.Provider>
  );
};
