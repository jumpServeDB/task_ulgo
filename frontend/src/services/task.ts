import apiFetch from "./apiFetch";

export const getTasks = () => apiFetch("GET", "tasks");
