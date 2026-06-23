// Admin
export interface Admin {
  id: string;
  name: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Service
export interface Service {
  id: string;
  name: string;
  duration: number;
  price?: number | null;
  description?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Booking
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: number;
}

export interface AppointmentService {
  id: string;
  appointmentId: string;
  serviceId: string;
  serviceName: string;
  duration: number;
  price: number;
}

export type BookingStatus = "Pending" | "Confirmed" | "Cancelled" | "Completed";

export interface Booking {
  id: string;
  customerId: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  totalDuration: number;
  totalPrice: number;
  status: BookingStatus;
  notes: string | null;
  cancelReason: string | null;
  createdAt: string;
  updatedAt: string;
  customer: Customer;
  appointmentServices: AppointmentService[];
}

// Schedule
export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface ScheduleSetting {
  id: string;
  day: DayOfWeek;
  isOpen: boolean;
  startTime: string;
  endTime: string;
}

export interface BlockedSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  reason: string | null;
}

export interface DayOff {
  id: string;
  date: string;
  reason: string | null;
}

// Dashboard
export interface DashboardStats {
  totalBookings: number;
  todaysBookings: number;
  upcomingBookings: number;
  cancelledBookings: number;
  totalActiveServices: number;
}

export interface RecentBooking {
  id: string;
  customerName: string;
  date: string;
  time: string;
  services: string[];
  status: BookingStatus;
  createdAt: string;
}

// Settings
export interface ShopSettings {
  id: string;
  shopStatus: "Open" | "Closed";
  maintenanceMessage: string | null;
  timeZone: string;
  slotInterval: number;
}

// API Response
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
