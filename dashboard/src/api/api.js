import axios from "axios";

const FRONTEND_LOGIN_URL = `${import.meta.env.VITE_FRONTEND_URL || "http://localhost:5174"}/login`;

// Token storage key
const TOKEN_KEY = "investedge_auth_token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3002",
  withCredentials: true, // still send cookie if available (Chrome/Firefox)
});

// Attach token from localStorage as Authorization header (fixes Safari cross-port cookie issue)
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(undefined, (error) => {
  if (error.response?.status === 401) {
    removeToken();
    window.location.href = FRONTEND_LOGIN_URL;
  }
  return Promise.reject(error);
});

export default api;
