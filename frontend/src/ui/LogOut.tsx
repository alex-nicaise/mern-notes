import React from "react";
import Button from "./Button";
import { removeStorage } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../context/useGlobalContext";

const LogOut = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setSessionUser } = useAuthContext();
  const handleLogOut = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Hit api route to delete refreshToken cookie
    const url = "http://localhost:4000/api/users/logout";
    const logOutResponse = await fetch(url, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (logOutResponse.status !== 200) {
      console.error("Failed to delete cookie on log out");
    }

    // Remove user from local storage
    removeStorage();

    setSessionUser(undefined);

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
