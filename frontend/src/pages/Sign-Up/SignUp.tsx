import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import FormError from "../../ui/FormError";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import ServerFeedbackDiv from "../../ui/ServerFeedbackDiv";
import LabelInput from "../../ui/LabelInput";
import { zodErrorsType } from "../../utils/validateForms";
import { validateForms } from "../../utils/validateForms";
import useGlobalContext from "../../context/useGlobalContext";

const SignUp = () => {
  const [zodErrors, setZodErrors] = useState<zodErrorsType>({});
  const [serverMessage, setServerMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useGlobalContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default behavior and reset errors
    e.preventDefault();
    setServerMessage("");
    setZodErrors({});
    setIsLoading(true);

    const { email, password, confirmPassword } = e.currentTarget;

    const formData = {
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    };

    // Validate input fields
    const { errors } = validateForms("signUp", formData);

    if (Object.keys(errors).length > 0) {
      setIsLoading(false);
      setZodErrors(errors);
      return;
    }

    // Send to api action
    try {
      // Request URL (DO NOT FORGET TO SEND OVER HTTPS)
      const url = "http://localhost:4000/api/users/create";
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status !== 200) {
        throw new Error(data.error);
      }

      // Set Loading to false
      setIsLoading(false);
      // Set server message to success if no status code issues
      setServerMessage(data.message);
    } catch (error) {
      // Set server message to Error
      if (error instanceof Error) {
        setIsLoading(false);
        setServerMessage(error.message);
      }
      setIsLoading(false);
      return;
    }
  };

  return !isAuthenticated || isAuthenticated === null ? (
    <main
      id="sign-in-section"
      className="w-full h-full flex justify-center items-center bg-gray-200 dark:bg-gray-950"
    >
      <Card extraClasses="py-16 px-8 max-w-md bg-white dark:bg-gray-950">
        <h1 className="font-bold text-lg">Create an Account</h1>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
          className="w-full flex flex-col mt-8"
        >
          <LabelInput
            name="email"
            type="text"
            label="Email"
            placeholder="joe@example.com"
            disabled={isLoading}
          />
          {zodErrors && <FormError>{zodErrors.email}</FormError>}

          <LabelInput
            name="password"
            type="password"
            label="Password"
            placeholder="Your password..."
            disabled={isLoading}
          />
          {zodErrors && <FormError>{zodErrors.password}</FormError>}

          <LabelInput
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="Confirm password..."
            disabled={isLoading}
          />
          {zodErrors.confirmPassword &&
            zodErrors.confirmPassword.map((err: string, index: number) => {
              return <FormError key={index}>{err}</FormError>;
            })}

          {serverMessage === "User created" ? (
            <ServerFeedbackDiv alt="success" message={`${serverMessage}!`} />
          ) : serverMessage === "" ? (
            ""
          ) : (
            <ServerFeedbackDiv message={serverMessage} />
          )}

          <Button
            alt="primary"
            type="submit"
            extraClasses="mx-auto mt-8 w-full"
            disabled={isLoading}
          >
            Submit
          </Button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <br />
          <Link to="/" className="underline">
            Sign In Here
          </Link>
        </p>
      </Card>
    </main>
  ) : (
    <Navigate to="/dashboard" />
  );
};

export default SignUp;
