import axios from "axios";

const API_GATEWAY_URL = "http://localhost:5001/gateway";

const apiClient = axios.create({
  baseURL: API_GATEWAY_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
