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
    const response = await httpClient.get<DashboardStats>(ENDPOINTS.DASHBOARD.STATS);
    // httpClient interceptor already unwraps data
    return response as unknown as DashboardStats;
  },
};
