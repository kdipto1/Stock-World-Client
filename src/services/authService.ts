import httpClient from './httpClient';
import { ENDPOINTS } from '../config/api';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  async register(userData: RegisterData) {
    const response = await httpClient.post(ENDPOINTS.USER.CREATE, userData);
    return response;
  },

  async login(credentials: LoginData) {
    // httpClient unwraps successful responses without meta to data payload
    const data = await httpClient.post(ENDPOINTS.AUTH.LOGIN, credentials);
    if ((data as any)?.token) {
      localStorage.setItem('accessToken', (data as any).token);
      localStorage.setItem('email', credentials.email);
    }
    return data;
  },

  async socialLogin(payload: { idToken: string }) {
    // httpClient unwraps to { token }
    const data = await httpClient.post(ENDPOINTS.AUTH.SOCIAL_LOGIN, payload);
    if ((data as any)?.token) {
      localStorage.setItem('accessToken', (data as any).token);
    }
    return data;
  },

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('email');
  },

  getAccessToken() {
    return localStorage.getItem('accessToken');
  },

  getUserEmail() {
    return localStorage.getItem('email');
  },

  isAuthenticated() {
    return !!this.getAccessToken();
  },
};
