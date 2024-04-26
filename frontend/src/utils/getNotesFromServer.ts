import fetchLink from "./fetchLink";
import { getStorage } from "./localStorage";

const getNotesFromServer = async () => {
  const url = "http://localhost:4000/api/notes/get-current";

  const token = getStorage("token");
  if (token === null) {
    throw new Error("Authorization token not found");
  }

  const { notes } = await fetchLink({
    url: url,
    method: "GET",
    credentials: "include",
    token: token,
  });

  return notes;
};

export default getNotesFromServer;
