// src/api.js
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000" });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export const login = (data: LoginData) => API.post("/login", data);
export const register = (data: RegisterData) => API.post("/register", data);
export const fetchMessages = () => API.get("/messages");
export const sendMessage = (data: { content: string }) =>
  API.post("/messages", data);
export const deleteMessageById = (messageId: number) =>
  API.delete(`/messages/${messageId}`);
