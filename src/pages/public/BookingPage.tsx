import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useServices } from "../../hooks/useServices";
import { useAvailableSlots } from "../../hooks/useSlots";
import { useShopSettings } from "../../hooks/useSettings";
import { bookingApi } from "../../services/bookingService";
import { api } from "../../services/api";
import { useToast } from "../../components/ui/Toast";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card, CardContent } from "../../components/ui/Card";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  User,
  Car,
  Wrench,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isBefore,
  startOfDay,
  getDay,
} from "date-fns";

type Step = 1 | 2 | 3 | 4 | 5;

const customerSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  vehicleMake: z.string().min(1, "Vehicle make is required"),
  vehicleModel: z.string().min(1, "Vehicle model is required"),
  vehicleYear: z.union([
    z
      .number()
      .int()
      .min(1900)
      .max(new Date().getFullYear() + 1),
    z
      .string()
      .transform((val) => Number(val))
      .pipe(
        z
          .number()
          .int()
          .min(1900)
          .max(new Date().getFullYear() + 1),
      ),
  ]),
  notes: z.string().optional(),
});

type CustomerFormData = z.infer<typeof customerSchema>;

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const DEFAULT_SCHEDULE: Record<string, boolean> = {
  Sunday: false,
  Monday: true,
  Tuesday: true,
  Wednesday: true,
  Thursday: true,
  Friday: true,
  Saturday: false,
};

export const BookingPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { data: services, isLoading: servicesLoading } = useServices();
  const { data: shopSettings } = useShopSettings();

  const [step, setStep] = useState<Step>(1);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [scheduleMap, setScheduleMap] =
    useState<Record<string, boolean>>(DEFAULT_SCHEDULE);
  const [dayOffsSet, setDayOffsSet] = useState<Set<string>>(new Set());
  const [scheduleLoaded, setScheduleLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchSchedule = async () => {
      try {
        const [scheduleRes, dayOffsRes] = await Promise.all([
          api.get("/schedule"),
          api.get("/schedule/day-offs"),
        ]);

        if (cancelled) return;

        const schedData = scheduleRes.data?.data?.schedule || [];
        const newSchedule: Record<string, boolean> = {};
        schedData.forEach((s: any) => {
          newSchedule[s.day] = s.isOpen;
        });

        const offsData = dayOffsRes.data?.data || [];
        const newDayOffs = new Set<string>();
        offsData.forEach((d: any) => {
          const dateStr =
            typeof d.date === "string"
              ? d.date.split("T")[0]
              : format(d.date, "yyyy-MM-dd");
          newDayOffs.add(dateStr);
        });

        setScheduleMap(newSchedule);
        setDayOffsSet(newDayOffs);
        setScheduleLoaded(true);
      } catch (err) {
        console.error("Failed to fetch schedule:", err);
        setScheduleLoaded(true);
      }
    };

    fetchSchedule();
    return () => {
      cancelled = true;
    };
  }, []);

  const selectedServices =
    services?.filter((s) => selectedServiceIds.includes(s.id)) || [];
  const totalDuration = selectedServices.reduce(
    (sum, s) => sum + s.duration,
    0,
  );
  const totalPrice = selectedServices.reduce(
    (sum, s) => sum + Number(s.price),
    0,
  );

  const { data: availableSlots, isLoading: slotsLoading } = useAvailableSlots(
    selectedDate,
    selectedServiceIds,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
  });

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // CRITICAL FIX: Calculate how many empty cells to render before the 1st of the month
  // getDay returns 0=Sunday, 1=Monday, ..., 6=Saturday
  const startWeekday = getDay(monthStart);

  const disabledDates = useMemo(() => {
    const result = new Set<string>();
    const today = startOfDay(new Date());

    days.forEach((date) => {
      const dateStr = format(date, "yyyy-MM-dd");

      if (isBefore(date, today)) {
        result.add(dateStr);
        return;
      }

      if (dayOffsSet.has(dateStr)) {
        result.add(dateStr);
        return;
      }

      const dayIndex = date.getDay();
      const dayName = DAY_NAMES[dayIndex];
      const isOpen = scheduleMap[dayName];

      if (isOpen === undefined) {
        if (!DEFAULT_SCHEDULE[dayName]) {
          result.add(dateStr);
        }
      } else if (!isOpen) {
        result.add(dateStr);
      }
    });

    return result;
  }, [days, scheduleMap, dayOffsSet]);

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId],
    );
  };

  const handleNext = () => {
    if (step === 1 && selectedServiceIds.length === 0) {
      showToast("Please select at least one service", "error");
      return;
    }
    if (step === 2 && !selectedDate) {
      showToast("Please select a date", "error");
      return;
    }
    if (step === 3 && !selectedTime) {
      showToast("Please select a time slot", "error");
      return;
    }
    setStep((prev) => (prev + 1) as Step);
  };

  const handleBack = () => {
    setStep((prev) => (prev - 1) as Step);
  };

  const onSubmit = async (data: CustomerFormData) => {
    setIsSubmitting(true);
    try {
      const response = await bookingApi.create({
        customer: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          vehicleMake: data.vehicleMake,
          vehicleModel: data.vehicleModel,
          vehicleYear: Number(data.vehicleYear),
        },
        appointmentDate: selectedDate,
        startTime: selectedTime,
        serviceIds: selectedServiceIds,
        notes: data.notes || undefined,
      });

      if (response.success) {
        setStep(5);
        showToast("Booking confirmed! Check your email.", "success");
      } else {
        showToast(response.message || "Booking failed", "error");
      }
    } catch (error: any) {
      showToast(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
        "error",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (shopSettings?.shopStatus === "Closed") {
    return (
      <div className="container-custom py-20">
        <div className="mx-auto max-w-md text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-[var(--color-muted-foreground)] mb-4" />
          <h1 className="text-2xl font-bold mb-2">Shop Closed</h1>
          <p className="text-[var(--color-muted-foreground)] mb-6">
            {shopSettings.maintenanceMessage ||
              "We are currently not accepting appointments."}
          </p>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8 lg:py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Book an Appointment
        </h1>
        <p className="text-[var(--color-muted-foreground)] mt-2">
          No account required. Book in 4 simple steps.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                  step >= s
                    ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
                    : "bg-[var(--color-muted)] text-[var(--color-muted-foreground)]"
                }`}
              >
                {step > s ? <Check className="h-4 w-4" /> : s}
              </div>
              {s < 4 && (
                <div
                  className={`h-1 w-8 rounded ${
                    step > s
                      ? "bg-[var(--color-primary)]"
                      : "bg-[var(--color-muted)]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-2 text-center text-sm text-[var(--color-muted-foreground)]">
          {step === 1 && "Select Services"}
          {step === 2 && "Choose Date"}
          {step === 3 && "Pick Time"}
          {step === 4 && "Your Information"}
          {step === 5 && "Confirmation"}
        </div>
      </div>

      {step === 1 && (
        <div className="mx-auto max-w-3xl">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Wrench className="h-5 w-5 text-[var(--color-primary)]" />
                <h2 className="text-xl font-semibold">Select Services</h2>
              </div>

              {servicesLoading ? (
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="h-16 animate-pulse rounded bg-[var(--color-muted)]"
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {services
                    ?.filter((s) => s.isActive)
                    .map((service) => {
                      const isSelected = selectedServiceIds.includes(
                        service.id,
                      );
                      return (
                        <button
                          key={service.id}
                          onClick={() => handleServiceToggle(service.id)}
                          className={`flex w-full items-center justify-between rounded-[var(--radius-md)] border p-4 text-left transition-all ${
                            isSelected
                              ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
                              : "border-[var(--color-border)] hover:bg-[var(--color-muted)]/50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-5 w-5 items-center justify-center rounded border ${
                                isSelected
                                  ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                                  : "border-[var(--color-border)]"
                              }`}
                            >
                              {isSelected && <Check className="h-3 w-3" />}
                            </div>
                            <div>
                              <p className="font-medium">{service.name}</p>
                              <p className="text-sm text-[var(--color-muted-foreground)]">
                                {service.duration} minutes
                              </p>
                            </div>
                          </div>
                          <span className="font-semibold">
                            ${Number(service.price).toFixed(2)}
                          </span>
                        </button>
                      );
                    })}

                  {selectedServiceIds.length > 0 && (
                    <div className="mt-4 rounded-[var(--radius-md)] bg-[var(--color-muted)]/50 p-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Total Duration:</span>
                        <span className="font-medium">
                          {totalDuration} minutes
                        </span>
                      </div>
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Price:</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <Button
                  onClick={handleNext}
                  disabled={selectedServiceIds.length === 0}
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {step === 2 && (
        <div className="mx-auto max-w-md">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="h-5 w-5 text-[var(--color-primary)]" />
                <h2 className="text-xl font-semibold">Choose Date</h2>
              </div>

              {!scheduleLoaded && (
                <div className="flex items-center justify-center py-4 mb-4">
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  <span className="text-sm text-[var(--color-muted-foreground)]">
                    Loading schedule...
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                  className="rounded-[var(--radius-md)] p-2 hover:bg-[var(--color-muted)]"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="font-semibold">
                  {format(currentMonth, "MMMM yyyy")}
                </span>
                <button
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  className="rounded-[var(--radius-md)] p-2 hover:bg-[var(--color-muted)]"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-[var(--color-muted-foreground)] py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* CRITICAL FIX: Calendar grid with proper weekday alignment */}
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for days before the 1st of the month */}
                {Array.from({ length: startWeekday }).map((_, index) => (
                  <div key={`empty-${index}`} className="h-10" />
                ))}

                {/* Actual calendar days */}
                {days.map((date) => {
                  const dateStr = format(date, "yyyy-MM-dd");
                  const disabled = disabledDates.has(dateStr);
                  const isSelected = selectedDate === dateStr;
                  const isCurrentDay =
                    dateStr === format(new Date(), "yyyy-MM-dd");

                  return (
                    <button
                      key={dateStr}
                      disabled={disabled}
                      onClick={() => setSelectedDate(dateStr)}
                      className={`
                        relative h-10 w-full rounded-[var(--radius-md)] text-sm font-medium transition-colors
                        ${
                          disabled
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : isSelected
                              ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
                              : "hover:bg-[var(--color-muted)]"
                        }
                        ${isCurrentDay && !disabled && !isSelected ? "ring-2 ring-[var(--color-primary)] ring-offset-1" : ""}
                      `}
                    >
                      {format(date, "d")}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!selectedDate}>
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {step === 3 && (
        <div className="mx-auto max-w-md">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-[var(--color-primary)]" />
                <h2 className="text-xl font-semibold">Pick Time</h2>
              </div>
              <p className="text-sm text-[var(--color-muted-foreground)] mb-4">
                {selectedDate} · {totalDuration} minutes total
              </p>

              {slotsLoading ? (
                <div className="flex h-32 items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-[var(--color-muted-foreground)]" />
                </div>
              ) : !availableSlots || availableSlots.length === 0 ? (
                <div className="flex h-32 flex-col items-center justify-center text-[var(--color-muted-foreground)]">
                  <AlertCircle className="h-8 w-8 mb-2" />
                  <p>No available slots for this date.</p>
                  <p className="text-xs">Try selecting a different date.</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`
                        rounded-[var(--radius-md)] border px-3 py-2.5 text-sm font-medium transition-colors
                        ${
                          selectedTime === slot
                            ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
                            : "border-[var(--color-border)] hover:bg-[var(--color-muted)]"
                        }
                      `}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!selectedTime || slotsLoading}
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {step === 4 && (
        <div className="mx-auto max-w-lg">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <User className="h-5 w-5 text-[var(--color-primary)]" />
                <h2 className="text-xl font-semibold">Your Information</h2>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  label="Full Name"
                  placeholder="John Doe"
                  error={errors.name?.message}
                  {...register("name")}
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                  error={errors.email?.message}
                  {...register("email")}
                />
                <Input
                  label="Phone Number"
                  placeholder="(555) 123-4567"
                  error={errors.phone?.message}
                  {...register("phone")}
                />

                <div className="flex items-center gap-2 mb-2">
                  <Car className="h-4 w-4 text-[var(--color-muted-foreground)]" />
                  <span className="text-sm font-medium">
                    Vehicle Information
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Make"
                    placeholder="Toyota"
                    error={errors.vehicleMake?.message}
                    {...register("vehicleMake")}
                  />
                  <Input
                    label="Model"
                    placeholder="Camry"
                    error={errors.vehicleModel?.message}
                    {...register("vehicleModel")}
                  />
                </div>
                <Input
                  label="Year"
                  type="number"
                  placeholder="2020"
                  error={errors.vehicleYear?.message}
                  {...register("vehicleYear")}
                />

                <div>
                  <label className="text-sm font-medium">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Any special requests or concerns..."
                    className="mt-1.5 flex w-full rounded-[var(--radius-md)] border border-[var(--color-input)] bg-transparent px-3 py-2 text-sm placeholder:text-[var(--color-muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
                    {...register("notes")}
                  />
                </div>

                <div className="rounded-[var(--radius-md)] bg-[var(--color-muted)]/50 p-4 space-y-2">
                  <p className="text-sm font-medium">Booking Summary</p>
                  <div className="text-sm text-[var(--color-muted-foreground)] space-y-1">
                    <p>Date: {selectedDate}</p>
                    <p>Time: {selectedTime}</p>
                    <p>Duration: {totalDuration} minutes</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedServices.map((s) => (
                        <span
                          key={s.id}
                          className="text-xs bg-[var(--color-background)] px-2 py-0.5 rounded-full"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                    <p className="font-semibold text-[var(--color-foreground)] pt-1 border-t border-[var(--color-border)]">
                      Total: ${totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <Button type="button" variant="outline" onClick={handleBack}>
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    Confirm Booking
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {step === 5 && (
        <div className="mx-auto max-w-md text-center py-12">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
          <p className="text-[var(--color-muted-foreground)] mb-6">
            Your appointment has been scheduled. A confirmation email has been
            sent to you.
          </p>
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-muted)]/30 p-6 mb-6 text-left space-y-2">
            <p>
              <span className="font-medium">Date:</span> {selectedDate}
            </p>
            <p>
              <span className="font-medium">Time:</span> {selectedTime}
            </p>
            <p>
              <span className="font-medium">Duration:</span> {totalDuration}{" "}
              minutes
            </p>
            <p>
              <span className="font-medium">Total:</span> $
              {totalPrice.toFixed(2)}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row justify-center">
            <Button onClick={() => navigate("/")} size="lg">
              Back to Home
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              size="lg"
            >
              Book Another
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
