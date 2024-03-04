import React from "react";

const Home = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    try {
      const response = await fetch("http://localhost:4000/api/users/create", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(data.email + ":" + data.password)}`,
        },
        body: JSON.stringify(data),
      });

      console.log(await response.json());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Home;
