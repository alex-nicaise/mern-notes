import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import FormError from "../../ui/FormError";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import ServerFeedbackDiv from "../../ui/ServerFeedbackDiv";
import LabelInput from "../../ui/LabelInput";
import { setStorage } from "../../utils/localStorage";
import { validateForms, zodErrorsType } from "../../utils/validateForms";
import useGlobalContext from "../../context/useGlobalContext";

const SignIn = () => {
  const [zodErrors, setZodErrors] = useState<zodErrorsType>({});
  const [serverMessage, setServerMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useGlobalContext();
  const { setSessionUser } = useGlobalContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default behavior and reset errors
    e.preventDefault();
    setServerMessage("");
    setZodErrors({});
    setIsLoading(true);

    const { email, password } = e.currentTarget;

    const formData = {
      email: email.value,
      password: password.value,
    };

    // Validate input fields
    const { errors } = validateForms("signIn", formData);

    if (Object.keys(errors).length > 0) {
      setIsLoading(false);
      setZodErrors(errors);
      return;
    }

    // Send to api action
    try {
      // Request URL (DO NOT FORGET TO SEND OVER HTTPS)
      const url = "http://localhost:4000/api/users/login";

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

      // Set local storage for auth
      const { token, refresh_token, user } = data;
      setStorage({
        auth: "Authenticated",
        token: token,
        refreshToken: refresh_token,
        user: JSON.stringify(user),
      });

      // Set context so user can see name on login
      setSessionUser((prev) => ({
        ...prev,
        email: user.email,
        name: user.name,
      }));

      setIsAuthenticated(true);
    } catch (error) {
      // Set server message to Error
      if (error instanceof Error) {
        setIsLoading(false);
        setIsAuthenticated(false);
        setServerMessage(error.message);
      }
    }
  };

  return !isAuthenticated || isAuthenticated === null ? (
    <main
      id="sign-in-section"
      className="w-full h-full flex justify-center items-center bg-gray-200 dark:bg-gray-950"
    >
      <Card extraClasses="py-16 px-8 max-w-md bg-white dark:bg-gray-950">
        <h1 className="font-bold text-lg">Log In To Your Account</h1>
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

          {serverMessage === "Authenticated" ? (
            <ServerFeedbackDiv alt="success" message={serverMessage} />
          ) : serverMessage === "" ? null : (
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
          Don't have an account? <br />
          <Link to="/sign-up" className="underline">
            Sign Up Here
          </Link>
        </p>
      </Card>
    </main>
  ) : (
    <Navigate to="/dashboard" />
  );
};

export default SignIn;
