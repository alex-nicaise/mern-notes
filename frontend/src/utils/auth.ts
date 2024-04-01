import { getStorage, setStorage } from "./localStorage";

type authenticateResponseType = {
  message: string;
  error?: string | unknown;
};

// Sends token to backend to confirm it's valid
const authenticateUser = async (): Promise<authenticateResponseType> => {
  const { item } = getStorage("token");

  if (item === null) {
    throw new Error("Authorization token not found");
  }

  const url = "http://localhost:4000/api/users/authenticate";

  const authResponse = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${item}`,
    },
  });

  if (authResponse.status !== 200) {
    throw new Error("Failed to authenticate user");
  }

  const { id } = await authResponse.json();

  setStorage({ userId: id });
  return { message: "User authenticated" };
};

export default authenticateUser;
