import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useBookings,
  useCancelBooking,
  useUpdateBookingStatus,
} from "../../hooks/useBookings";
import { useToast } from "../../components/ui/Toast";
import { Button } from "../../components/ui/Button";

import { Select } from "../../components/ui/Select";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Modal } from "../../components/ui/Modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table";
import {
  CalendarDays,
  Eye,
  Ban,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Search,
  Calendar,
  Clock,
  List,
  X,
  RefreshCw,
  Trash2,
  User,
  Phone,
  Mail,
  Car,
  Wrench,
} from "lucide-react";
import {
  format,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  parseISO,
} from "date-fns";

type ViewMode = "WEEK" | "MONTH" | "LIST";

const cancelSchema = z.object({
  cancelReason: z.string().min(1, "Reason is required").max(500),
});

type CancelFormData = z.infer<typeof cancelSchema>;

const statusOptions = [
  { value: "", label: "All Status" },
  { value: "Pending", label: "Pending" },
  { value: "Confirmed", label: "Confirmed" },
  { value: "Cancelled", label: "Cancelled" },
  { value: "Completed", label: "Completed" },
];

const statusBadgeVariant = (status: string) => {
  switch (status) {
    case "Confirmed":
      return "success" as const;
    case "Pending":
      return "default" as const;
    case "Cancelled":
      return "destructive" as const;
    case "Completed":
      return "secondary" as const;
    default:
      return "default" as const;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Confirmed":
    case "Pending":
      return "bg-blue-500";
    case "Completed":
      return "bg-green-500";
    case "Cancelled":
      return "bg-red-500";
    default:
      return "bg-gray-400";
  }
};

const getStatusBgLight = (status: string) => {
  switch (status) {
    case "Confirmed":
    case "Pending":
      return "bg-blue-50 border-blue-200 text-blue-700";
    case "Completed":
      return "bg-green-50 border-green-200 text-green-700";
    case "Cancelled":
      return "bg-red-50 border-red-200 text-red-700";
    default:
      return "bg-gray-50 border-gray-200 text-gray-700";
  }
};

const HOURS = Array.from({ length: 11 }, (_, i) => i + 7);
const HOUR_HEIGHT = 72;

export const BookingsPage = () => {
  const { showToast } = useToast();
  const [viewMode, setViewMode] = useState<ViewMode>("WEEK");
  const [referenceDate, setReferenceDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [limit] = useState(100);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: bookingsData, isLoading } = useBookings({
    page,
    limit,
    status: statusFilter || undefined,
  });

  const cancelMutation = useCancelBooking();
  const updateStatusMutation = useUpdateBookingStatus();

  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [cancelBookingId, setCancelBookingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CancelFormData>({
    resolver: zodResolver(cancelSchema),
  });

  const dateRange = useMemo(() => {
    let start, end;
    if (viewMode === "MONTH") {
      const monthStart = startOfMonth(referenceDate);
      const monthEnd = endOfMonth(referenceDate);
      start = startOfWeek(monthStart, { weekStartsOn: 1 });
      end = endOfWeek(monthEnd, { weekStartsOn: 1 });
    } else {
      start = startOfWeek(referenceDate, { weekStartsOn: 1 });
      end = endOfWeek(referenceDate, { weekStartsOn: 1 });
    }
    return { start, end, days: eachDayOfInterval({ start, end }) };
  }, [referenceDate, viewMode]);

  const allBookings = useMemo(() => {
    const list = bookingsData?.data || [];
    if (!searchQuery) return list;
    const query = searchQuery.toLowerCase();
    return list.filter(
      (b: any) =>
        b.customer?.name?.toLowerCase().includes(query) ||
        b.customer?.email?.toLowerCase().includes(query) ||
        b.customer?.phone?.toLowerCase().includes(query),
    );
  }, [bookingsData, searchQuery]);

  const visibleBookings = useMemo(() => {
    return allBookings.filter((b: any) => {
      const bDate = parseISO(b.appointmentDate?.toString().split("T")[0]);
      return bDate >= dateRange.start && bDate <= dateRange.end;
    });
  }, [allBookings, dateRange]);

  const navigateRefDate = (direction: "PREV" | "NEXT") => {
    if (viewMode === "MONTH") {
      setReferenceDate(
        direction === "PREV"
          ? subMonths(referenceDate, 1)
          : addMonths(referenceDate, 1),
      );
    } else {
      setReferenceDate(
        direction === "PREV"
          ? subWeeks(referenceDate, 1)
          : addWeeks(referenceDate, 1),
      );
    }
  };

  const handleCancel = async (data: CancelFormData) => {
    if (!cancelBookingId) return;
    try {
      await cancelMutation.mutateAsync({
        id: cancelBookingId,
        cancelReason: data.cancelReason,
      });
      showToast("Booking cancelled successfully", "success");
      setCancelBookingId(null);
      reset();
    } catch (error: any) {
      showToast(
        error?.response?.data?.message || "Failed to cancel booking",
        "error",
      );
    }
  };

  const handleMarkCompleted = async (id: string) => {
    try {
      await updateStatusMutation.mutateAsync({ id, status: "Completed" });
      showToast("Booking marked as completed", "success");
      setSelectedBooking(null);
    } catch (error: any) {
      showToast(
        error?.response?.data?.message || "Failed to update status",
        "error",
      );
    }
  };

  const getBookingStyle = (booking: any) => {
    const [sHour, sMin] = booking.startTime.split(":").map(Number);
    const startMinutes = (sHour - 7) * 60 + sMin;
    const duration = booking.totalDuration || 30;
    const pixelsPerMinute = HOUR_HEIGHT / 60;
    return {
      top: `${startMinutes * pixelsPerMinute}px`,
      height: `${Math.max(duration * pixelsPerMinute, 28)}px`,
    };
  };

  const totalPages = bookingsData?.meta?.totalPages || 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
          <p className="text-[var(--color-muted-foreground)]">
            Manage all appointments
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-[var(--color-muted)]/50 rounded-[var(--radius-lg)] p-1">
            <button
              onClick={() => {
                setViewMode("WEEK");
                setReferenceDate(new Date());
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] text-xs font-bold uppercase transition-all ${
                viewMode === "WEEK"
                  ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-sm"
                  : "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
              }`}
            >
              <Calendar className="h-3.5 w-3.5" />
              Week
            </button>
            <button
              onClick={() => {
                setViewMode("MONTH");
                setReferenceDate(new Date());
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] text-xs font-bold uppercase transition-all ${
                viewMode === "MONTH"
                  ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-sm"
                  : "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
              }`}
            >
              <CalendarDays className="h-3.5 w-3.5" />
              Month
            </button>
            <button
              onClick={() => setViewMode("LIST")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] text-xs font-bold uppercase transition-all ${
                viewMode === "LIST"
                  ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-sm"
                  : "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
              }`}
            >
              <List className="h-3.5 w-3.5" />
              List
            </button>
          </div>
        </div>
      </div>

      {/* Navigation & Filters */}
      <div className="flex flex-col xl:flex-row xl:items-center gap-4">
        <div className="flex items-center justify-center gap-2 bg-[var(--color-muted)]/50 p-2 rounded-[var(--radius-lg)] border border-[var(--color-border)]">
          <button
            onClick={() => navigateRefDate("PREV")}
            className="p-2 hover:bg-[var(--color-card)] hover:shadow-sm rounded-xl transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="px-4 font-bold min-w-[140px] text-center uppercase text-sm">
            {viewMode === "MONTH"
              ? format(referenceDate, "MMMM yyyy")
              : `${format(dateRange.start, "MMM d")} - ${format(dateRange.end, "MMM d, yyyy")}`}
          </span>
          <button
            onClick={() => navigateRefDate("NEXT")}
            className="p-2 hover:bg-[var(--color-card)] hover:shadow-sm rounded-xl transition-all"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-3">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted-foreground)]" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex h-10 w-full rounded-[var(--radius-md)] border border-[var(--color-input)] bg-transparent pl-9 pr-3 py-2 text-sm placeholder:text-[var(--color-muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
            />
          </div>
          <div className="w-44">
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>
      </div>

      {/* ==================== WEEK VIEW ==================== */}
      {viewMode === "WEEK" && (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-7 border-b border-[var(--color-border)]">
              {dateRange.days.map((day, idx) => (
                <div
                  key={idx}
                  onClick={() => setReferenceDate(day)}
                  className={`p-2 md:p-3 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-[var(--color-muted)]/50 ${
                    isSameDay(day, new Date())
                      ? "bg-[var(--color-primary)]/5"
                      : ""
                  }`}
                >
                  <span className="text-[10px] font-bold text-[var(--color-muted-foreground)] uppercase mb-1">
                    {format(day, "EEE")}
                  </span>
                  <span
                    className={`text-sm md:text-base font-bold w-7 h-7 md:w-9 md:h-9 flex items-center justify-center rounded-full ${
                      isSameDay(day, new Date())
                        ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-sm"
                        : "text-[var(--color-foreground)]"
                    }`}
                  >
                    {format(day, "d")}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="relative flex"
              style={{ height: `${HOURS.length * HOUR_HEIGHT}px` }}
            >
              <div className="w-14 md:w-16 border-r border-[var(--color-border)] flex-shrink-0 bg-[var(--color-card)] sticky left-0 z-10">
                {HOURS.map((hour) => (
                  <div
                    key={hour}
                    className="flex items-start justify-center"
                    style={{ height: `${HOUR_HEIGHT}px` }}
                  >
                    <span className="text-[9px] font-bold text-[var(--color-muted-foreground)] uppercase mt-[-5px] bg-[var(--color-card)] px-1">
                      {hour > 12
                        ? `${hour - 12} PM`
                        : hour === 12
                          ? "12 PM"
                          : `${hour} AM`}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex-1 grid grid-cols-7 relative">
                {HOURS.map((hour) => (
                  <div
                    key={hour}
                    className="absolute w-full border-t border-[var(--color-border)]/40"
                    style={{ top: `${(hour - 7) * HOUR_HEIGHT}px` }}
                  />
                ))}

                {dateRange.days.map((day, dayIdx) => {
                  const dayBookings = visibleBookings.filter((b: any) =>
                    isSameDay(
                      parseISO(b.appointmentDate?.toString().split("T")[0]),
                      day,
                    ),
                  );

                  return (
                    <div
                      key={dayIdx}
                      className="relative border-r border-[var(--color-border)]/40 min-h-full"
                    >
                      {dayBookings.map((b: any) => {
                        const style = getBookingStyle(b);
                        return (
                          <div
                            key={b.id}
                            onClick={() => setSelectedBooking(b)}
                            style={style}
                            className={`absolute left-[1px] right-[1px] md:left-0.5 md:right-0.5 rounded-md shadow-sm cursor-pointer transition-all hover:brightness-95 hover:shadow-md overflow-hidden z-10 py-0.5 px-1 md:py-1 md:px-1.5 ${getStatusColor(b.status)}`}
                          >
                            <p className="text-white font-bold text-[8px] md:text-[10px] leading-tight uppercase tracking-tight truncate">
                              {b.customer?.name?.split(" ")[0] || "Guest"}
                            </p>
                            <p className="text-white/90 text-[7px] md:text-[9px] font-semibold">
                              {b.startTime}
                            </p>
                            {b.appointmentServices?.length > 0 && (
                              <p className="text-white/70 text-[6px] md:text-[8px] leading-tight truncate">
                                {b.appointmentServices[0].serviceName}
                                {b.appointmentServices.length > 1
                                  ? ` +${b.appointmentServices.length - 1}`
                                  : ""}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ==================== MONTH VIEW ==================== */}
      {viewMode === "MONTH" && (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            {/* Compact Monday-start headers */}
            <div className="grid grid-cols-7 border-b border-[var(--color-border)] bg-[var(--color-muted)]/30">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div
                  key={day}
                  className="py-2 md:py-3 text-center text-[10px] md:text-xs font-bold text-[var(--color-muted-foreground)] uppercase tracking-wider"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Compact grid - NO auto-rows-fr, NO excessive min-height */}
            <div className="grid grid-cols-7">
              {dateRange.days.map((day, idx) => {
                const dayBookings = visibleBookings.filter((b: any) =>
                  isSameDay(
                    parseISO(b.appointmentDate?.toString().split("T")[0]),
                    day,
                  ),
                );
                const isCurrentMonth = isSameMonth(day, referenceDate);

                return (
                  <div
                    key={idx}
                    className={`border-r border-b border-[var(--color-border)]/40 p-1 md:p-1.5 min-h-[48px] md:min-h-[64px] ${
                      !isCurrentMonth
                        ? "bg-[var(--color-muted)]/20"
                        : "bg-[var(--color-card)]"
                    }`}
                  >
                    {/* Date number + count badge */}
                    <div className="flex justify-between items-center mb-0.5">
                      <span
                        className={`text-[10px] md:text-xs font-bold leading-none ${
                          isSameDay(day, new Date())
                            ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center"
                            : isCurrentMonth
                              ? "text-[var(--color-foreground)]"
                              : "text-[var(--color-muted-foreground)]/40"
                        }`}
                      >
                        {format(day, "d")}
                      </span>
                      {dayBookings.length > 0 && (
                        <span className="text-[9px] font-bold text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-1.5 py-0 rounded-full">
                          {dayBookings.length}
                        </span>
                      )}
                    </div>

                    {/* Compact booking bars */}
                    <div className="space-y-[2px]">
                      {dayBookings.slice(0, 3).map((b: any) => (
                        <button
                          key={b.id}
                          onClick={() => setSelectedBooking(b)}
                          className={`w-full text-left rounded px-1 py-[2px] text-[7px] md:text-[9px] leading-none border-l-2 truncate cursor-pointer hover:brightness-95 ${getStatusBgLight(b.status)}`}
                        >
                          <span className="font-bold">
                            {b.startTime} {b.customer?.name?.split(" ")[0]}
                          </span>
                        </button>
                      ))}
                      {dayBookings.length > 3 && (
                        <p className="text-[7px] text-[var(--color-muted-foreground)] font-medium pl-1 leading-none">
                          +{dayBookings.length - 3}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ==================== LIST VIEW ==================== */}
      {viewMode === "LIST" && (
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6 space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-12 animate-pulse rounded bg-[var(--color-muted)]"
                  />
                ))}
              </div>
            ) : !allBookings || allBookings.length === 0 ? (
              <div className="flex h-32 items-center justify-center text-[var(--color-muted-foreground)]">
                No bookings found
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Services</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allBookings.map((booking: any) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-mono text-xs">
                          #{booking.id.slice(0, 8)}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            {booking.customer?.name}
                          </div>
                          <div className="text-xs text-[var(--color-muted-foreground)]">
                            {booking.customer?.phone}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <CalendarDays className="h-3 w-3 text-[var(--color-muted-foreground)]" />
                            <span className="text-sm">
                              {
                                booking.appointmentDate
                                  ?.toString()
                                  .split("T")[0]
                              }
                            </span>
                          </div>
                          <div className="text-xs text-[var(--color-muted-foreground)]">
                            {booking.startTime} - {booking.endTime}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {booking.appointmentServices?.map((s: any) => (
                              <span
                                key={s.id}
                                className="inline-flex items-center rounded-full bg-[var(--color-muted)] px-2 py-0.5 text-xs font-medium"
                              >
                                {s.serviceName}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          ${Number(booking.totalPrice).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusBadgeVariant(booking.status)}>
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedBooking(booking)}
                              title="View details"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {booking.status === "Confirmed" && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleMarkCompleted(booking.id)
                                  }
                                  title="Mark completed"
                                >
                                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setCancelBookingId(booking.id)}
                                  title="Cancel booking"
                                >
                                  <Ban className="h-4 w-4 text-[var(--color-destructive)]" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="flex items-center justify-between border-t border-[var(--color-border)] px-4 py-3">
                  <div className="text-sm text-[var(--color-muted-foreground)]">
                    Page {page} of {totalPages}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={page === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* ==================== RESPONSIVE BOOKING DETAIL MODAL ==================== */}
      <Modal
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        title="Booking Details"
      >
        {selectedBooking && (
          <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-1">
            {/* Status Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <p className="text-[10px] text-[var(--color-muted-foreground)] font-bold uppercase tracking-widest">
                  Booking ID
                </p>
                <p className="font-mono text-sm font-bold">
                  #{selectedBooking.id.slice(0, 8)}
                </p>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${getStatusBgLight(selectedBooking.status)} self-start`}
              >
                {selectedBooking.status}
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[var(--color-muted)]/30 p-3 md:p-4 rounded-[var(--radius-xl)]">
              <div>
                <p className="text-[10px] font-bold text-[var(--color-muted-foreground)] uppercase tracking-widest mb-1">
                  Date
                </p>
                <p className="text-sm font-bold text-[var(--color-foreground)]">
                  {selectedBooking.appointmentDate?.toString().split("T")[0]}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[var(--color-muted-foreground)] uppercase tracking-widest mb-1">
                  Time
                </p>
                <p className="text-sm font-bold text-[var(--color-foreground)]">
                  {selectedBooking.startTime} - {selectedBooking.endTime}
                </p>
              </div>
            </div>

            {/* Customer Info */}
            <div>
              <p className="text-[10px] font-bold text-[var(--color-muted-foreground)] uppercase tracking-widest mb-2">
                Customer Information
              </p>
              <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-3 md:p-4 rounded-[var(--radius-xl)] space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-[var(--color-muted-foreground)] flex-shrink-0" />
                  <p className="text-sm font-bold truncate">
                    {selectedBooking.customer?.name}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[var(--color-muted-foreground)] flex-shrink-0" />
                  <p className="text-sm text-[var(--color-muted-foreground)] truncate">
                    {selectedBooking.customer?.email}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[var(--color-muted-foreground)] flex-shrink-0" />
                  <p className="text-sm text-[var(--color-muted-foreground)]">
                    {selectedBooking.customer?.phone}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-[var(--color-muted-foreground)] flex-shrink-0" />
                  <p className="text-sm text-[var(--color-muted-foreground)]">
                    {selectedBooking.customer?.vehicleYear}{" "}
                    {selectedBooking.customer?.vehicleMake}{" "}
                    {selectedBooking.customer?.vehicleModel}
                  </p>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <p className="text-[10px] font-bold text-[var(--color-muted-foreground)] uppercase tracking-widest mb-2">
                Services
              </p>
              <div className="space-y-2">
                {selectedBooking.appointmentServices?.map(
                  (s: any, i: number) => (
                    <div
                      key={i}
                      className="flex justify-between items-center bg-[var(--color-card)] border border-[var(--color-border)] p-2 md:p-3 rounded-[var(--radius-lg)]"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Wrench className="h-4 w-4 text-[var(--color-muted-foreground)] flex-shrink-0" />
                        <span className="text-sm font-medium truncate">
                          {s.serviceName}
                        </span>
                      </div>
                      <div className="text-right flex-shrink-0 ml-2">
                        <span className="text-xs font-bold text-[var(--color-foreground)]">
                          ${Number(s.price).toFixed(2)}
                        </span>
                        <span className="text-[10px] text-[var(--color-muted-foreground)] ml-2">
                          {s.duration}m
                        </span>
                      </div>
                    </div>
                  ),
                )}
              </div>
              <div className="flex justify-between mt-3 pt-3 border-t border-[var(--color-border)]">
                <span className="font-bold text-sm">Total</span>
                <span className="font-bold text-lg text-[var(--color-primary)]">
                  ${Number(selectedBooking.totalPrice).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Notes */}
            {selectedBooking.notes && (
              <div>
                <p className="text-[10px] font-bold text-[var(--color-muted-foreground)] uppercase tracking-widest mb-1">
                  Notes
                </p>
                <p className="text-sm bg-[var(--color-muted)]/30 p-3 rounded-[var(--radius-lg)]">
                  {selectedBooking.notes}
                </p>
              </div>
            )}

            {/* Cancel Reason */}
            {selectedBooking.cancelReason && (
              <div>
                <p className="text-[10px] font-bold text-[var(--color-destructive)] uppercase tracking-widest mb-1">
                  Cancellation Reason
                </p>
                <p className="text-sm text-[var(--color-destructive)] bg-red-50 p-3 rounded-[var(--radius-lg)]">
                  {selectedBooking.cancelReason}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 pt-2 border-t border-[var(--color-border)]">
              <p className="text-[10px] font-bold text-[var(--color-muted-foreground)] uppercase tracking-widest">
                Update Status
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2  p-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleMarkCompleted(selectedBooking.id)}
                  disabled={selectedBooking.status === "Completed"}
                  className="gap-1 text-green-600 border-green-200 hover:bg-green-50"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Complete
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCancelBookingId(selectedBooking.id)}
                  disabled={selectedBooking.status === "Cancelled"}
                  className="gap-1 text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Ban className="h-4 w-4" />
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedBooking(null)}
                  className="gap-1"
                >
                  <X className="h-4 w-4" />
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Cancel Booking Modal */}
      <Modal
        isOpen={!!cancelBookingId}
        onClose={() => {
          setCancelBookingId(null);
          reset();
        }}
        title="Cancel Booking"
      >
        <form onSubmit={handleSubmit(handleCancel)} className="space-y-4">
          <p className="text-sm text-[var(--color-muted-foreground)]">
            Please provide a reason for cancellation. This will be sent to the
            customer via email.
          </p>
          <div>
            <textarea
              rows={3}
              placeholder="Enter cancellation reason..."
              className="flex w-full rounded-[var(--radius-md)] border border-[var(--color-input)] bg-transparent px-3 py-2 text-sm placeholder:text-[var(--color-muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
              {...register("cancelReason")}
            />
            {errors.cancelReason && (
              <p className="text-sm text-[var(--color-destructive)] mt-1">
                {errors.cancelReason.message}
              </p>
            )}
          </div>
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setCancelBookingId(null);
                reset();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="destructive"
              isLoading={cancelMutation.isPending}
            >
              Confirm Cancellation
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
