import { api } from "./api";
import type {
  ApiResponse,
  ScheduleSetting,
  BlockedSlot,
  DayOff,
  ShopSettings,
} from "../types/index";

export const scheduleApi = {
  getSchedule: async () => {
    const response =
      await api.get<
        ApiResponse<{ schedule: ScheduleSetting[]; slotInterval: number }>
      >("/schedule");
    return response.data;
  },

  updateSchedule: async (
    day: string,
    data: { isOpen: boolean; startTime: string; endTime: string },
  ) => {
    const response = await api.put<ApiResponse<ScheduleSetting>>(
      `/schedule/${day}`,
      data,
    );
    return response.data;
  },

  getBlockedSlots: async (date?: string) => {
    const params = date ? `?date=${date}` : "";
    const response = await api.get<ApiResponse<BlockedSlot[]>>(
      `/schedule/blocked-slots${params}`,
    );
    return response.data;
  },

  createBlockedSlot: async (data: {
    date: string;
    startTime: string;
    endTime: string;
    reason?: string;
  }) => {
    const response = await api.post<ApiResponse<BlockedSlot>>(
      "/schedule/blocked-slots",
      data,
    );
    return response.data;
  },

  deleteBlockedSlot: async (id: string) => {
    const response = await api.delete<ApiResponse<null>>(
      `/schedule/blocked-slots/${id}`,
    );
    return response.data;
  },

  getDayOffs: async () => {
    const response = await api.get<ApiResponse<DayOff[]>>("/schedule/day-offs");
    return response.data;
  },

  createDayOff: async (data: { date: string; reason?: string }) => {
    const response = await api.post<ApiResponse<DayOff>>(
      "/schedule/day-offs",
      data,
    );
    return response.data;
  },

  deleteDayOff: async (id: string) => {
    const response = await api.delete<ApiResponse<null>>(
      `/schedule/day-offs/${id}`,
    );
    return response.data;
  },

  updateSlotInterval: async (slotInterval: number) => {
    const response = await api.put<ApiResponse<ShopSettings>>(
      "/schedule/slot-interval",
      {
        slotInterval,
      },
    );
    return response.data;
  },

  getAvailableSlots: async (date: string, serviceIds: string[]) => {
    const response = await api.get<ApiResponse<string[]>>(
      `/schedule/available-slots?date=${date}&serviceIds=${serviceIds.join(",")}`,
    );
    return response.data;
  },
};
