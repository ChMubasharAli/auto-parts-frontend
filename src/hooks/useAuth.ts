import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../services/authService";
// import type { LoginCredentials } from '../services/authService';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      if (data.data?.token) {
        localStorage.setItem("token", data.data.token);
        queryClient.setQueryData(["admin"], data.data.admin);
      }
    },
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["admin"],
    queryFn: async () => {
      const response = await authApi.getProfile();
      return response.data;
    },
    enabled: !!localStorage.getItem("token"),
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: authApi.changePassword,
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: authApi.forgotPassword,
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: authApi.resetPassword,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return () => {
    localStorage.removeItem("token");
    queryClient.clear();
    window.location.href = "/admin/login";
  };
};
