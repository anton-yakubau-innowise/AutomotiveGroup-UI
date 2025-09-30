import axios from "axios";

// --- Configuration ---
// It's a good practice to store base URLs in environment variables
// For now, we'll hardcode them.
const USER_SERVICE_BASE_URL = "http://localhost:5003/api";
const VEHICLE_SERVICE_BASE_URL = "http://localhost:5002/api"; // Temporary address for VehicleService

// --- Interceptor Function ---
// A single function to add the JWT token to any request.
// This helps us avoid code duplication.
const authInterceptor = (config: any) => {
  const token = localStorage.getItem("jwt_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// --- User Service API Client ---
const userApiClient = axios.create({
  baseURL: USER_SERVICE_BASE_URL,
});
// Apply the interceptor to the user client
userApiClient.interceptors.request.use(authInterceptor);

// --- Vehicle Service API Client ---
const vehicleApiClient = axios.create({
  baseURL: VEHICLE_SERVICE_BASE_URL,
});
// Apply the same interceptor to the vehicle client
vehicleApiClient.interceptors.request.use(authInterceptor);

// --- Export all clients ---
export { userApiClient, vehicleApiClient };
