import fetchLink from "./fetchLink";
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

  const data = await fetchLink({
    url: url,
    method: "POST",
    credentials: "include",
    token: token,
  });

  const { newToken } = data;

  if (newToken === null) {
    return { message: "Not authenticated" };
  } else {
    return { message: "User authenticated", newToken: newToken };
  }
};

export default authenticateUser;
