import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { settingsApi } from "../services/settingsService";

export const useShopSettings = () => {
  return useQuery({
    queryKey: ["shop-settings"],
    queryFn: async () => {
      const response = await settingsApi.getShopSettings();
      return response.data;
    },
  });
};

export const useUpdateShopSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: settingsApi.updateShopSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shop-settings"] });
    },
  });
};
