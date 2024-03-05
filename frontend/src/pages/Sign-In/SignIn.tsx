import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <h1>Sign In</h1>
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" />

        <button type="submit">Submit</button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link to="/sign-up" className="underline">
          Sign Up Here
        </Link>
      </p>
    </>
  );
};

export default SignIn;
