import { api } from "./api";
import type { ApiResponse, Service } from "../types/index";

export const serviceApi = {
  getAll: async () => {
    const response = await api.get<ApiResponse<Service[]>>("/services");
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<ApiResponse<Service>>(`/services/${id}`);
    return response.data;
  },

  create: async (data: {
    name: string;
    duration: number;
    description?: string | null;
    price?: number | null;
    isActive?: boolean;
  }) => {
    const response = await api.post<ApiResponse<Service>>("/services", data);
    return response.data;
  },

  update: async (
    id: string,
    data: Partial<Omit<Service, "id" | "createdAt" | "updatedAt">>,
  ) => {
    const response = await api.put<ApiResponse<Service>>(
      `/services/${id}`,
      data,
    );
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<ApiResponse<null>>(`/services/${id}`);
    return response.data;
  },

  toggleStatus: async (id: string) => {
    const response = await api.patch<ApiResponse<Service>>(
      `/services/${id}/toggle`,
    );
    return response.data;
  },
};
