import apiFetch from "./apiFetch";

export const getTasks = () => apiFetch("GET", "tasks");
export const addTask = (title: string) =>
  apiFetch("POST", "tasks", {
    title,
  });
export const deleteTask = (_id: string) => apiFetch("DELETE", `tasks/${_id}`);
