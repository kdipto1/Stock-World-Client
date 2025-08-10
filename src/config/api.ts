// API Configuration
export const API_CONFIG = {
  // New server structure
  BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
  
  // Always use new API
  USE_NEW_API: true,
  
  // Timeout settings
  TIMEOUT: 30000,
};

// Endpoints mapping for new API
export const ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: "/auth/login",
    SOCIAL_LOGIN: "/auth/social-login"
  },

  // User endpoints
  USER: {
    CREATE: "/users/create-user"
  },
  
  // Inventory endpoints
  INVENTORY: {
    HOME: "/inventory/home",
    ALL: "/inventory/manage",
    CREATE: "/inventory",
    BY_ID: "/inventory/:id",
    USER_ITEMS: "/inventory/user"
  },

  // Dashboard endpoints
  DASHBOARD: {
    STATS: "/dashboard/stats"
  }
};

// Helper function to get the correct endpoint
export const getEndpoint = (category: string, endpoint: string) => {
  const path = (ENDPOINTS as any)[category][endpoint];
  return `${API_CONFIG.BASE_URL}${path}`;
};

// Helper function to get base URL
export const getBaseUrl = () => {
  return API_CONFIG.BASE_URL;
};
