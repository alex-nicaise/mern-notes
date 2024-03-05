import { SetStateAction, createContext, useContext, useState } from "react";

type ServerMessageContext = {
  serverMessage: string;
  setServerMessage: React.Dispatch<SetStateAction<string>>;
};

const ServerMessageContext = createContext<ServerMessageContext | null>(null);

export const ServerMessageContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [serverMessage, setServerMessage] = useState("");

  return (
    <ServerMessageContext.Provider value={{ serverMessage, setServerMessage }}>
      {children}
    </ServerMessageContext.Provider>
  );
};

export const useServerMessages = () => {
  const context = useContext(ServerMessageContext);

  if (!context) {
    throw new Error("No Server Message Context Found.");
  }

  return context;
};
