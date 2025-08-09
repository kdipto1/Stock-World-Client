import axios from "axios";
import { API_CONFIG } from "../config/api";

// Create axios instance with centralized baseURL
const httpClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
httpClient.interceptors.request.use(
  (config) => {
    // Add authorization header if token exists
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
httpClient.interceptors.response.use(
  (response) => {
    // New API returns { success, message, data, meta? }
    if (response.data && response.data.success) {
      // Return full response for endpoints that include meta (like pagination)
      if (response.data.meta) {
        return response.data;
      }
      // Return just data for simple responses
      return response.data.data;
    }
    return response.data;
  },
  (error) => {
    // Handle error responses
    if (error.response) {
      const { status, data } = error.response;

      // Handle unauthorized errors
      if (status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("email");
        // Only redirect if not already on login page
        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login";
        }
        return Promise.reject(new Error("Authentication required"));
      }

      // Extract error message and validation errors
      let errorMessage = "An error occurred";
      let validationErrors = null;

      if (data) {
        errorMessage = data.message || errorMessage;
        validationErrors = data.errors || null;
      }

      const customError = new Error(errorMessage) as any;
      customError.validationErrors = validationErrors;
      customError.status = status;

      return Promise.reject(customError);
    }

    // Network error or other errors
    if (error.code === "NETWORK_ERROR" || !error.response) {
      const networkError = new Error(
        "Network error. Please check your connection."
      ) as any;
      networkError.isNetworkError = true;
      return Promise.reject(networkError);
    }

    return Promise.reject(error);
  }
);

export default httpClient;
