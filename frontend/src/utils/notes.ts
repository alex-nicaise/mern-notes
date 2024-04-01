import { getStorage } from "./localStorage";

export const getNotes = async (id: string) => {
  const token = getStorage("token");

  if (token === null) {
    throw new Error("Authorization token not found");
  }

  const url = "http://localhost:4000/api/notes/get-current";
  const notesResponse = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id: id }),
  });

  if (notesResponse.status !== 200) {
    throw new Error("Failed to get notes");
  }

  const { notes } = await notesResponse.json();

  return { notes };
};
