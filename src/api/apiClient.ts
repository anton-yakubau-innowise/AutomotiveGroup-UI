import axios from "axios";

const API_GATEWAY_URL =
  "https://ocelotapigateway.lemonsmoke-f2c9c75c.northeurope.azurecontainerapps.io/";

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
