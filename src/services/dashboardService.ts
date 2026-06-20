import { api } from "./api";
import type {
  ApiResponse,
  DashboardStats,
  RecentBooking,
} from "../types/index";

export const dashboardApi = {
  getStats: async () => {
    const response =
      await api.get<ApiResponse<DashboardStats>>("/dashboard/stats");
    return response.data;
  },

  getRecentBookings: async (limit = 10) => {
    const response = await api.get<ApiResponse<RecentBooking[]>>(
      `/dashboard/recent-bookings?limit=${limit}`,
    );
    return response.data;
  },
};
