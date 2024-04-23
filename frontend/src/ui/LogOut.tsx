import React from "react";
import Button from "./Button";
import { removeStorage } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../context/useGlobalContext";
import fetchLink from "../utils/fetchLink";

const LogOut = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setSessionUser } = useAuthContext();
  const handleLogOut = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Hit api route to delete refreshToken cookie
      const url = "http://localhost:4000/api/users/logout";

      await fetchLink({
        url: url,
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
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
