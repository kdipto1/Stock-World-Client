import httpClient from './httpClient';
import { getEndpoint } from '../config/api';

export const authService = {
  /**
   * Login user and get access token
   * @param {Object} credentials - User credentials
   * @param {string} credentials.email - User email
   * @returns {Promise<Object>} Login response with token
   */
  async login(credentials: any) {
    try {
      const url = getEndpoint('AUTH', 'LOGIN');
      const response = await httpClient.post(url, credentials);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Logout user
   */
  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('email');
  },

  /**
   * Get stored access token
   * @returns {string|null} Access token
   */
  getAccessToken() {
    return localStorage.getItem('accessToken');
  },

  /**
   * Get stored user email
   * @returns {string|null} User email
   */
  getUserEmail() {
    return localStorage.getItem('email');
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} Authentication status
   */
  isAuthenticated() {
    return !!this.getAccessToken();
  },
};
