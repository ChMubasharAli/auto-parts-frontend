import { api } from "./api";
import type { ApiResponse, Admin, LoginCredentials } from "../types/index";

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post<
      ApiResponse<{ token: string; admin: Admin }>
    >("/auth/login", credentials);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get<ApiResponse<Admin>>("/auth/profile");
    return response.data;
  },

  updateProfile: async (data: { name: string; email: string }) => {
    const response = await api.put<ApiResponse<Admin>>("/auth/profile", data);
    return response.data;
  },

  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    const response = await api.put<ApiResponse<null>>(
      "/auth/change-password",
      data,
    );
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await api.post<ApiResponse<null>>(
      "/auth/forgot-password",
      { email },
    );
    return response.data;
  },

  resetPassword: async (data: {
    token: string;
    password: string;
    confirmPassword: string;
  }) => {
    const response = await api.post<ApiResponse<null>>(
      "/auth/reset-password",
      data,
    );
    return response.data;
  },
};
