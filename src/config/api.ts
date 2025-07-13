// API Configuration
export const API_CONFIG = {
  // Current production server (fallback)
  OLD_BASE_URL: "https://stock-world-server.onrender.com",
  
  // New server structure (when ready)
  NEW_BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
  
  // Feature flag to toggle between old and new API
  USE_NEW_API: import.meta.env.VITE_USE_NEW_API === "true",
  
  // Timeout settings
  TIMEOUT: 30000,
};

// Endpoints mapping for both old and new API
export const ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: {
      OLD: "/login",
      NEW: "/auth/login"
    }
  },
  
  // Inventory endpoints
  INVENTORY: {
    HOME: {
      OLD: "/homeInventory",
      NEW: "/inventory/home"
    },
    ALL: {
      OLD: "/manageInventory",
      NEW: "/inventory/manage"
    },
    CREATE: {
      OLD: "/inventory",
      NEW: "/inventory"
    },
    BY_ID: {
      OLD: "/inventory/:id",
      NEW: "/inventory/:id"
    },
    USER_ITEMS: {
      OLD: "/inventoryUser",
      NEW: "/inventory/user"
    }
  }
};

// Helper function to get the correct endpoint
export const getEndpoint = (category: string, endpoint: string) => {
  const useNew = API_CONFIG.USE_NEW_API;
  const baseUrl = useNew ? API_CONFIG.NEW_BASE_URL : API_CONFIG.OLD_BASE_URL;
  const path = useNew ? (ENDPOINTS as any)[category][endpoint].NEW : (ENDPOINTS as any)[category][endpoint].OLD;
  
  return `${baseUrl}${path}`;
};

// Helper function to get base URL
export const getBaseUrl = () => {
  return API_CONFIG.USE_NEW_API ? API_CONFIG.NEW_BASE_URL : API_CONFIG.OLD_BASE_URL;
};
