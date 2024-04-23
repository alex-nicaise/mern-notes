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
  } else if (body) {
    options.body = body;
  } else if (credentials) {
    options.credentials = credentials;
  }

  const response = await fetch(url, options);

  if (response.status !== 200) {
    throw new Error("Connection to server failed");
  }
  const data = await response.json();

  return data;
};

export default fetchLink;
