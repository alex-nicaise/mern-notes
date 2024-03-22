import { createContext, useEffect, useState } from "react";
import authenticateUser from "../../utils/auth";

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType | false>(false);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const usingAuthentication = async () => {
    const { message, error } = await authenticateUser();

    if (message === "User authenticated") {
      console.log(message);
      return setIsAuthenticated(true);
    }

    console.error(error);
    return setIsAuthenticated(false);
  };

  useEffect(() => {
    usingAuthentication();
  });

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

/*

// Login
  ^^^^^// Sets the token in local storage
  ^^^^^// isAuthenticated === true in context

// Context
  ^^^^^// on "/" route, if isAuthenticated === true > push to dashboard
  ^^^^^// on App load > useEffect > authenticateUser

// Dashboard
  ^^^^^// isAuthenticated ? render : navigate
*/
