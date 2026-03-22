import axios from "axios";

const API = axios.create({
  baseURL: "https://compliance-tracker-uzha.onrender.com",
});

// Clients
export const getClients = () => API.get("/clients");

// Tasks
export const getTasks = (clientId) => API.get(`/tasks/${clientId}`);
export const createTask = (data) => API.post("/tasks", data);
export const updateTaskStatus = (taskId, status) =>
  API.put(`/tasks/${taskId}`, { status });

export default API;