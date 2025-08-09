import httpClient from "./httpClient";
import { ENDPOINTS } from "../config/api";

interface GetAllItemsParams {
  page?: number;
  limit?: number;
  sortBy?: "name" | "price" | "quantity" | "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
  category?: string;
}

export const inventoryService = {
  /**
   * Get home page inventory items (public)
   * @returns {Promise<Array>} Home inventory items
   */
  async getHomeItems() {
    const response = await httpClient.get(ENDPOINTS.INVENTORY.HOME);
    return response;
  },

  /**
   * Get all inventory items with pagination, sorting, and filtering (protected)
   * @param {GetAllItemsParams} params - Query parameters
   * @returns {Promise<{data: Array, meta: Object}>} Paginated inventory items
   */
  async getAllItems(params?: GetAllItemsParams) {
    const response = await httpClient.get(ENDPOINTS.INVENTORY.ALL, {
      params,
    });
    return response;
  },

  /**
   * Get inventory item by ID (protected)
   * @param {string} id - Item ID
   * @returns {Promise<Object>} Inventory item
   */
  async getItemById(id: string) {
    const response = await httpClient.get(
      ENDPOINTS.INVENTORY.BY_ID.replace(":id", id)
    );
    return response;
  },

  /**
   * Create new inventory item (protected)
   * @param {Object} itemData - Item data
   * @returns {Promise<Object>} Created item
   */
  async createItem(itemData: any) {
    const response = await httpClient.post(
      ENDPOINTS.INVENTORY.CREATE,
      itemData
    );
    return response;
  },

  /**
   * Update inventory item (protected)
   * @param {string} id - Item ID
   * @param {Object} updateData - Update data
   * @returns {Promise<Object>} Updated item
   */
  async updateItem(id: string, updateData: any) {
    const response = await httpClient.put(
      ENDPOINTS.INVENTORY.BY_ID.replace(":id", id),
      updateData
    );
    return response;
  },

  /**
   * Delete inventory item (protected)
   * @param {string} id - Item ID
   * @returns {Promise<Object>} Deletion result
   */
  async deleteItem(id: string) {
    const response = await httpClient.delete(
      ENDPOINTS.INVENTORY.BY_ID.replace(":id", id)
    );
    return response;
  },

  /**
   * Get user's inventory items (protected)
   * @param {string} email - User email
   * @returns {Promise<Array>} User's inventory items
   */
  async getUserItems(email: string) {
    const response = await httpClient.get(ENDPOINTS.INVENTORY.USER_ITEMS, {
      params: { email },
    });
    console.log(response);
    return response;
  },
};
