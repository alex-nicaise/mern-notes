// Utility classes for setting and removing token from local storage

export const setStorage = (token: string) => {
  if (!localStorage.getItem("user")) {
    localStorage.setItem("user", token);
  }
};

export const getStorage = () => {
  if (localStorage.getItem("user")) {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
  }
  return null;
};

export const removeStorage = () => {
  if (localStorage.getItem("user")) {
    localStorage.removeItem("user");
  }
};
