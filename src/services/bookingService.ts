import { api } from "./api";
import type { ApiResponse, Booking } from "../types";

export const bookingApi = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.status) queryParams.append("status", params.status);

    const response = await api.get<ApiResponse<Booking[]>>(
      `/bookings?${queryParams.toString()}`,
    );
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<ApiResponse<Booking>>(`/bookings/${id}`);
    return response.data;
  },

  create: async (data: {
    customer: {
      name: string;
      email: string;
      phone: string;
      vehicleMake: string;
      vehicleModel: string;
      vehicleYear: number;
    };
    appointmentDate: string;
    startTime: string;
    serviceIds: string[];
    notes?: string;
  }) => {
    const response = await api.post<ApiResponse<Booking>>("/bookings", data);
    return response.data;
  },

  cancel: async (id: string, cancelReason: string) => {
    const response = await api.post<ApiResponse<Booking>>(
      `/bookings/${id}/cancel`,
      {
        cancelReason,
      },
    );
    return response.data;
  },

  updateStatus: async (id: string, status: string) => {
    const response = await api.patch<ApiResponse<Booking>>(
      `/bookings/${id}/status`,
      {
        status,
      },
    );
    return response.data;
  },
};
