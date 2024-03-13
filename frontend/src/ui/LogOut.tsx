import React from "react";
import Button from "./Button";
import { removeStorage } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const navigate = useNavigate();
  const handleLogOut = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default behavior
    e.preventDefault();

    // Remove user from local storage
    removeStorage();

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
