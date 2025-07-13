import axios from 'axios';
import { API_CONFIG, getBaseUrl } from '../config/api';

// Create axios instance
const httpClient = axios.create({
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
httpClient.interceptors.request.use(
  (config) => {
    // Set base URL dynamically based on feature flag
    config.baseURL = getBaseUrl();
    
    // Add authorization header if token exists
    const token = localStorage.getItem('accessToken');
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
    // Handle new API response format
    if (API_CONFIG.USE_NEW_API) {
      // New API returns { success, message, data }
      if (response.data && response.data.success) {
        return response.data.data;
      }
      return response.data;
    } else {
      // Old API returns data directly
      return response.data;
    }
  },
  (error) => {
    // Handle different error formats
    if (error.response) {
      const { status, data } = error.response;
      
      // Handle unauthorized errors
      if (status === 401) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('email');
        window.location.href = '/login';
      }
      
      // Extract error message based on API version
      let errorMessage = 'An error occurred';
      if (API_CONFIG.USE_NEW_API) {
        errorMessage = data?.message || errorMessage;
      } else {
        errorMessage = data?.message || error.message || errorMessage;
      }
      
      return Promise.reject(new Error(errorMessage));
    }
    
    return Promise.reject(error);
  }
);

export default httpClient;
