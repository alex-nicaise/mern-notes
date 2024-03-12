// Utility classes for setting and removing token from local storage

export const setStorage = (token: string) => {
  if (!localStorage.getItem("user")) {
    localStorage.setItem("user", token);
  }
};

export const removeStorage = () => {
  if (localStorage.getItem("user")) {
    localStorage.removeItem("user");
  }
};
