import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3002",
  withCredentials: true,
});

api.interceptors.response.use(undefined, (error) => {
  if (error.response?.status === 401) {
    window.location.href = `${import.meta.env.VITE_FRONTEND_URL || "http://localhost:5174"}/login`;
  }

  return Promise.reject(error);
});

export default api;
