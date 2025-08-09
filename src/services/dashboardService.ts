import httpClient from "./httpClient";
import { ENDPOINTS } from "../config/api";

interface DashboardStats {
  totalItems: number;
  totalQuantity: number;
  totalValue: number;
  lowStockItems: number;
  categoryCounts: Array<{
    _id: string;
    count: number;
  }>;
}

export const dashboardService = {
  /**
   * Get dashboard statistics (protected)
   * @returns {Promise<DashboardStats>} Dashboard statistics
   */
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await httpClient.get(ENDPOINTS.DASHBOARD.STATS);
    return response.data; // return only the data part of the response
  },
};
