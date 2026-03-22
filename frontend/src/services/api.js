import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// Clients
export const getClients = () => API.get("/clients");

// Tasks
export const getTasks = (clientId) => API.get(`/tasks/${clientId}`);
export const createTask = (data) => API.post("/tasks", data);
export const updateTaskStatus = (taskId, status) =>
  API.put(`/tasks/${taskId}`, { status });

export default API;