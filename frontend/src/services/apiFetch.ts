const { VITE_API_BASE_URL } = import.meta.env;
import * as userServices from "./user.ts";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type FetchOptions = RequestInit;

const apiFetch = (
  method: HttpMethod,
  path: string,
  body: unknown = null,
): Promise<Response> => {
  const jwToken = userServices.getSessionTokenStorage();

  const options: FetchOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (jwToken) {
    options.headers = {
      ...(options.headers as Record<string, string>),
      Authorization: `Bearer ${jwToken}`,
    };
  }

  if (body != null) {
    options.body = JSON.stringify(body);
  }

  return fetch(VITE_API_BASE_URL + path, options);
};

export default apiFetch;
