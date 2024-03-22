import React from "react";
import Button from "./Button";
import { removeStorage } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../context/useGlobalContext";

const LogOut = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuthContext();
  const handleLogOut = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default behavior
    e.preventDefault();

    // Remove user from local storage
    removeStorage();

    // Set authentication in context
    setIsAuthenticated(false);

    // Redirect to sign in
    navigate("/");
  };

  return (
    <>
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleLogOut(e)}>
        <Button alt="primary" type="submit">
          Log Out
        </Button>
      </form>
    </>
  );
};

export default LogOut;
