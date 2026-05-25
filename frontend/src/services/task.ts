import apiFetch from "./apiFetch";

export const getTasks = () => apiFetch("GET", "tasks");
export const addTask = (title: string) =>
  apiFetch("POST", "tasks", {
    title,
  });
