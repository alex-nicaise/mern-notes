import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import FormError from "../../ui/FormError";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import { useServerMessages } from "../../context/ServerMessageContext";
import ServerFeedbackDiv from "../../ui/ServerFeedbackDiv";

const signUpSchema = z
  .object({
    email: z.string().email({ message: "Enter a valid email." }),
    password: z.string().min(10, "Password should be at least 10 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });

type signUpErrors = {
  email?: string[] | undefined;
  password?: string[] | undefined;
  confirmPassword?: string[] | undefined;
};

const SignUp = () => {
  const [zodErrors, setZodErrors] = useState<signUpErrors>({});
  const { serverMessage, setServerMessage } = useServerMessages();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default behavior and reset errors
    e.preventDefault();
    setZodErrors({});
    setServerMessage("");

    const { email, password, confirmPassword } = e.currentTarget;

    const data = {
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    };

    // Parse input data for validation
    const validatedFields = signUpSchema.safeParse(data);

    if (!validatedFields.success) {
      setZodErrors(validatedFields.error.flatten().fieldErrors);
      return;
    }

    // Send to api action
    try {
      const request = await fetch("http://localhost:4000/api/users/create", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response = await request.json();

      if (response.status === 400 || response.status === 500) {
        throw new Error(response.message);
      }

      // Set server message to success if no status code issues
      setServerMessage("Success!");
    } catch (error) {
      // Set server message to Error
      if (error instanceof Error) {
        setServerMessage(error.message);
      } else {
        return;
      }
    }
  };

  return (
    <section
      id="sign-in-section"
      className="w-full h-full flex justify-center items-center"
    >
      <Card extraClasses="py-16 px-8">
        <h1 className="font-bold text-lg">Create an Account</h1>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
          className="w-full flex flex-col mt-8"
        >
          <label htmlFor="email" className="text-sm mt-3">
            Email
          </label>
          <input
            type="text"
            name="email"
            className="w-full mt-1 p-1 px-3 border border-gray-300 rounded"
          />
          {zodErrors && <FormError>{zodErrors.email}</FormError>}

          <label htmlFor="password" className="text-sm mt-3">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="w-full mt-1 p-1 px-3 border border-gray-300 rounded"
          />
          {zodErrors?.password &&
            zodErrors.password.map((err, index) => {
              return <FormError key={index}>{err}</FormError>;
            })}

          <label htmlFor="confirmPassword" className="text-sm mt-3">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            className="w-full mt-1 py-1 px-3 border border-gray-300 rounded"
          />
          {zodErrors?.confirmPassword &&
            zodErrors.confirmPassword.map((err, index) => {
              return <FormError key={index}>{err}</FormError>;
            })}

          {serverMessage === "Success!" ? (
            <ServerFeedbackDiv alt="success" />
          ) : serverMessage === "" ? null : (
            <ServerFeedbackDiv />
          )}

          <Button alt="primary" type="submit" extraClasses="mx-auto mt-8">
            Submit
          </Button>
        </form>
        <p className="mt-4">
          Already have an account?{" "}
          <Link to="/" className="underline">
            Sign In Here
          </Link>
        </p>
      </Card>
    </section>
  );
};

export default SignUp;
