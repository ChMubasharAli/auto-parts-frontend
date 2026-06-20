import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { scheduleApi } from "..//services/scheduleService";

export const useSchedule = () => {
  return useQuery({
    queryKey: ["schedule"],
    queryFn: async () => {
      const response = await scheduleApi.getSchedule();
      return response.data;
    },
  });
};

export const useUpdateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      day,
      data,
    }: {
      day: string;
      data: Parameters<typeof scheduleApi.updateSchedule>[1];
    }) => scheduleApi.updateSchedule(day, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
    },
  });
};

export const useBlockedSlots = (date?: string) => {
  return useQuery({
    queryKey: ["blocked-slots", date],
    queryFn: async () => {
      const response = await scheduleApi.getBlockedSlots(date);
      return response.data || [];
    },
  });
};

export const useCreateBlockedSlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: scheduleApi.createBlockedSlot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocked-slots"] });
    },
  });
};

export const useDeleteBlockedSlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: scheduleApi.deleteBlockedSlot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocked-slots"] });
    },
  });
};

export const useDayOffs = () => {
  return useQuery({
    queryKey: ["day-offs"],
    queryFn: async () => {
      const response = await scheduleApi.getDayOffs();
      return response.data || [];
    },
  });
};

export const useCreateDayOff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: scheduleApi.createDayOff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["day-offs"] });
    },
  });
};

export const useDeleteDayOff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: scheduleApi.deleteDayOff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["day-offs"] });
    },
  });
};

export const useUpdateSlotInterval = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: scheduleApi.updateSlotInterval,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
    },
  });
};
