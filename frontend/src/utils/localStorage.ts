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
    return item;
  }

  return null;
};

export const removeStorage = () => {
  localStorage.clear();
};
