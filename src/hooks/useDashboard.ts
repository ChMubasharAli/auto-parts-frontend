import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../services/dashboardService";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: async () => {
      const response = await dashboardApi.getStats();
      return response.data;
    },
  });
};

export const useRecentBookings = (limit = 10) => {
  return useQuery({
    queryKey: ["dashboard", "recent-bookings", limit],
    queryFn: async () => {
      const response = await dashboardApi.getRecentBookings(limit);
      return response.data;
    },
  });
};
