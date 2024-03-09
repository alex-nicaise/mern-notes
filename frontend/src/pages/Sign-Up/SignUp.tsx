import { useState } from "react";
import { Link } from "react-router-dom";
import FormError from "../../ui/FormError";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import ServerFeedbackDiv from "../../ui/ServerFeedbackDiv";
import LabelInput from "../../ui/LabelInput";
import { signUpState, signUpSchema } from "./sign-up-schemas";
import { useLoadingContext } from "../../context/LoadingContext/useLoadingContext";

const SignUp = () => {
  const [signUpState, setSignUpState] = useState<signUpState>({
    zodErrors: {},
    serverMessage: "",
  });

  const { loading, setLoading } = useLoadingContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default behavior and reset errors
    e.preventDefault();
    setSignUpState({ zodErrors: {}, serverMessage: "" });
    setLoading(true);

    const { email, password, confirmPassword } = e.currentTarget;

    const data = {
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    };

    // Parse input data for validation
    const validatedFields = signUpSchema.safeParse(data);

    if (!validatedFields.success) {
      setLoading(false);
      return setSignUpState((prev) => {
        return {
          ...prev,
          zodErrors: validatedFields.error.flatten().fieldErrors,
        };
      });
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

      // Set Loading to false
      setLoading(false);
      // Set server message to success if no status code issues
      return setSignUpState((prev) => {
        return {
          ...prev,
          serverMessage: "Success!",
        };
      });
    } catch (error) {
      // Set server message to Error
      if (error instanceof Error) {
        setLoading(false);
        return setSignUpState((prev) => {
          return {
            ...prev,
            serverMessage: error.message,
          };
        });
      } else {
        setLoading(false);
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
            disabled={loading}
          />
          {signUpState.zodErrors && (
            <FormError>{signUpState.zodErrors.email}</FormError>
          )}

          <LabelInput
            name="password"
            type="password"
            label="Password"
            placeholder="Your password..."
            disabled={loading}
          />
          {signUpState.zodErrors && (
            <FormError>{signUpState.zodErrors.password}</FormError>
          )}

          <LabelInput
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="Confirm password..."
            disabled={loading}
          />
          {signUpState.zodErrors.confirmPassword &&
            signUpState.zodErrors.confirmPassword.map((err, index) => {
              return <FormError key={index}>{err}</FormError>;
            })}

          {signUpState.serverMessage === "Success!" ? (
            <ServerFeedbackDiv
              alt="success"
              message={signUpState.serverMessage}
            />
          ) : signUpState.serverMessage === "" ? null : (
            <ServerFeedbackDiv message={signUpState.serverMessage} />
          )}

          <Button
            alt="primary"
            type="submit"
            extraClasses="mx-auto mt-8 w-full"
            disabled={loading}
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
    </section>
  );
};

export default SignUp;
