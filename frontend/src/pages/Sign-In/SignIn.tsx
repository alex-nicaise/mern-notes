import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormError from "../../ui/FormError";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import ServerFeedbackDiv from "../../ui/ServerFeedbackDiv";
import LabelInput from "../../ui/LabelInput";
import { signInState, signInSchema } from "./sign-in-schemas";
import { useLoadingContext } from "../../context/LoadingContext/useLoadingContext";
import { setStorage } from "../../utils/localStorage";

const SignIn = () => {
  const navigate = useNavigate();
  const [signInState, setsignInState] = useState<signInState>({
    zodErrors: {},
    serverMessage: "",
  });
  const { isLoading, setIsLoading } = useLoadingContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default behavior and reset errors
    e.preventDefault();
    setsignInState({ zodErrors: {}, serverMessage: "" });
    setIsLoading(true);

    const { email, password } = e.currentTarget;

    const data = {
      email: email.value,
      password: password.value,
    };

    // Parse input data for validation
    const validatedFields = signInSchema.safeParse(data);

    if (!validatedFields.success) {
      setIsLoading(false);
      return setsignInState((prev) => {
        return {
          ...prev,
          zodErrors: validatedFields.error.flatten().fieldErrors,
        };
      });
    }

    // Send to api action
    try {
      // Request URL (DO NOT FORGET TO SEND OVER HTTPS)
      const url = "http://localhost:4000/api/users/login";

      const request = await fetch(url, {
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

      // Set Loading to false
      setIsLoading(false);

      // Set local storage for auth
      setStorage(JSON.stringify(response));

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      // Set server message to Error
      if (error instanceof Error) {
        setIsLoading(false);
        return setsignInState((prev) => {
          return {
            ...prev,
            serverMessage: error.message,
          };
        });
      } else {
        setIsLoading(false);
        return;
      }
    }
  };

  return (
    <section
      id="sign-in-section"
      className="w-full h-full flex justify-center items-center"
    >
      <Card extraClasses="py-16 px-8 max-w-md">
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
          {signInState.zodErrors && (
            <FormError>{signInState.zodErrors.email}</FormError>
          )}

          <LabelInput
            name="password"
            type="password"
            label="Password"
            placeholder="Your password..."
            disabled={isLoading}
          />
          {signInState.zodErrors && (
            <FormError>{signInState.zodErrors.password}</FormError>
          )}

          {signInState.serverMessage === "Success!" ? (
            <ServerFeedbackDiv
              alt="success"
              message={signInState.serverMessage}
            />
          ) : signInState.serverMessage === "" ? null : (
            <ServerFeedbackDiv message={signInState.serverMessage} />
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
    </section>
  );
};

export default SignIn;
