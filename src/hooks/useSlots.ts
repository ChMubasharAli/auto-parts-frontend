import { useQuery } from "@tanstack/react-query";
import { scheduleApi } from "../services/scheduleService";

export const useAvailableSlots = (date: string, serviceIds: string[]) => {
  return useQuery({
    queryKey: ["available-slots", date, serviceIds],
    queryFn: async () => {
      if (!date || serviceIds.length === 0) return [];
      const response = await scheduleApi.getAvailableSlots(date, serviceIds);
      return response.data || [];
    },
    enabled: !!date && serviceIds.length > 0,
  });
};
