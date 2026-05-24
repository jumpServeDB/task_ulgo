import apiFetch from "./apiFetch";

type Credentials = { email: string; password: string };

export const createUser = (creds: Credentials) =>
  apiFetch("POST", "user/signup", {
    email: creds.email,
    password: creds.password,
  });

export const createSession = (creds: Credentials) =>
  apiFetch("POST", "user/login", {
    email: creds.email,
    password: creds.password,
  });

export const setSessionTokenStorage = (sessionToken: string) =>
  localStorage.setItem("session_token", sessionToken);

export const getSessionTokenStorage = (): string | null =>
  localStorage.getItem("session_token");

export const removeSessionTokenStorage = (): void =>
  localStorage.removeItem("session_token");
