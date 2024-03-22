// Utility classes for setting and removing token from local storage

// type for setting tokens
type setItemsType = {
  [key: string]: string;
};

export const setStorage = (items: setItemsType) => {
  for (const item in items) {
    localStorage.setItem(item, items[item]);
  }
};

export const getStorage = (key: string) => {
  // Check for token
  if (localStorage.getItem(key)) {
    const item = localStorage.getItem(key);
    return { item };
  }

  return { item: null };
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
  if (localStorage.getItem("userId")) {
    localStorage.removeItem("userId");
  }
};
