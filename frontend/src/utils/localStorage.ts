// Utility classes for setting and removing token from local storage

// type for setting tokens
type setItemsType = {
  token: string;
  refreshToken: string;
  [key: string]: string;
};

export const setStorage = (items: setItemsType) => {
  for (const item in items) {
    localStorage.setItem(item, items[item]);
  }
};

export const getStorage = () => {
  // Check for token
  if (localStorage.getItem("token")) {
    const token = localStorage.getItem("token");
    return { token };
  }

  // TODO: IMPLEMENT BACKEND API VALIDATION CHECKING

  return { token: null };
};

export const removeStorage = () => {
  if (localStorage.getItem("auth")) {
    localStorage.removeItem("auth");
  }
  if (localStorage.getItem("token")) {
    localStorage.removeItem("token");
  }
  if (localStorage.getItem("refreshToken")) {
    localStorage.removeItem("refreshToken");
  }
};
