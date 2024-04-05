import { getStorage } from "./localStorage";

type authenticateResponseType = {
  message: string;
  error?: string | unknown;
  newToken?: string;
};

// Sends token to backend to confirm it's valid
const authenticateUser = async (): Promise<authenticateResponseType> => {
  const token = getStorage("token");

  if (token === null) {
    throw new Error("Authorization token not found");
  }

  const url = "http://localhost:4000/api/users/authenticate";

  const authResponse = await fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (authResponse.status !== 200) {
    throw new Error("Failed to authenticate user");
  }

  const { newToken } = await authResponse.json();

  if (newToken) {
    return { message: "User authenticated", newToken: newToken };
  }

  return { message: "User authenticated" };
};

export default authenticateUser;
