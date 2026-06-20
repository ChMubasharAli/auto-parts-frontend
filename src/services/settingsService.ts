import { api } from "./api";
import type { ApiResponse, ShopSettings } from "../types/index";

export const settingsApi = {
  getShopSettings: async () => {
    const response = await api.get<ApiResponse<ShopSettings>>("/settings");
    return response.data;
  },

  updateShopSettings: async (data: {
    shopStatus: "Open" | "Closed";
    maintenanceMessage?: string;
  }) => {
    const response = await api.put<ApiResponse<ShopSettings>>(
      "/settings",
      data,
    );
    return response.data;
  },
};
