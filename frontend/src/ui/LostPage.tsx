import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import useGlobalContext from "../context/useGlobalContext";
import LoadingSplash from "./LoadingSplash";

const LostPage = () => {
  const navigate = useNavigate();
  const { isLoading } = useGlobalContext();

  return !isLoading ? (
    <main className="flex flex-col w-full h-full justify-center items-center dark:bg-gray-950">
      <h1 className="text-3xl font-bold">Looks like you're lost...</h1>
      <Button
        alt="primary"
        extraClasses="mt-6"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          navigate("/");
        }}
      >
        Sign In Here
      </Button>
    </main>
  ) : (
    <LoadingSplash />
  );
};

export default LostPage;
