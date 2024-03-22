import { getStorage, setStorage } from "./localStorage";

type authenticateResponseType = {
  message: string;
  error?: string | unknown;
};

// Sends token to backend to confirm it's valid
const authenticateUser = async (): Promise<authenticateResponseType> => {
  try {
    const { item } = getStorage("token");

    if (item === null) {
      throw new Error("Authorization token not found");
    }

    const response = await fetch("http://localhost:4000/api/users/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${item}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to authenticate user");
    }

    const { id } = await response.json();

    setStorage({ userId: id });
    return { message: "User authenticated" };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: "Failed to authenticate user",
        error: "Could not authenticate user",
      };
    }
    return {
      message: "Failed to authenticate user",
      error: "Unknown error occurred",
    };
  }
};

export default authenticateUser;
