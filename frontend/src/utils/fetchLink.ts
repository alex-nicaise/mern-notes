type fetchOptionsType = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  token?: string;
  body?: string;
  credentials?: RequestCredentials;
};

const fetchLink = async ({
  url,
  method,
  token,
  body,
  credentials,
}: fetchOptionsType) => {
  const options: RequestInit = {
    method: method,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  if (body) {
    options.body = body;
  }
  if (credentials) {
    options.credentials = credentials;
  }

  const response = await fetch(url, options);
  const data = await response.json();

  if (response.status !== 200) {
    let error;

    if (url.includes("users/login") || url.includes("users/create")) {
      error = new Error(data.error);
    } else if (url.includes("logout")) {
      error = new Error("Failed to delete cookie on log out");
    } else if (url.includes("users/authenticate")) {
      error = new Error("Failed to authenticate user");
    } else {
      error = new Error("Connection to server failed");
    }

    throw error;
  }

  return data;
};

export default fetchLink;
