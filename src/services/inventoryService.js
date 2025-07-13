import httpClient from './httpClient';
import { getEndpoint } from '../config/api';

export const inventoryService = {
  /**
   * Get home page inventory items (public)
   * @returns {Promise<Array>} Home inventory items
   */
  async getHomeItems() {
    try {
      const url = getEndpoint('INVENTORY', 'HOME');
      const response = await httpClient.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get all inventory items (protected)
   * @returns {Promise<Array>} All inventory items
   */
  async getAllItems() {
    try {
      const url = getEndpoint('INVENTORY', 'ALL');
      const response = await httpClient.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get inventory item by ID (protected)
   * @param {string} id - Item ID
   * @returns {Promise<Object>} Inventory item
   */
  async getItemById(id) {
    try {
      const url = getEndpoint('INVENTORY', 'BY_ID').replace(':id', id);
      const response = await httpClient.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create new inventory item (protected)
   * @param {Object} itemData - Item data
   * @returns {Promise<Object>} Created item
   */
  async createItem(itemData) {
    try {
      const url = getEndpoint('INVENTORY', 'CREATE');
      const response = await httpClient.post(url, itemData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update inventory item (protected)
   * @param {string} id - Item ID
   * @param {Object} updateData - Update data
   * @returns {Promise<Object>} Updated item
   */
  async updateItem(id, updateData) {
    try {
      const url = getEndpoint('INVENTORY', 'BY_ID').replace(':id', id);
      const response = await httpClient.put(url, updateData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete inventory item (protected)
   * @param {string} id - Item ID
   * @returns {Promise<Object>} Deletion result
   */
  async deleteItem(id) {
    try {
      const url = getEndpoint('INVENTORY', 'BY_ID').replace(':id', id);
      const response = await httpClient.delete(url);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get user's inventory items (protected)
   * @param {string} email - User email
   * @returns {Promise<Array>} User's inventory items
   */
  async getUserItems(email) {
    try {
      const url = getEndpoint('INVENTORY', 'USER_ITEMS');
      const response = await httpClient.get(url, {
        params: { email }
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
};
