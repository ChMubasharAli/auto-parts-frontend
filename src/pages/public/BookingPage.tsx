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
import { Badge } from "../../components/ui/Badge";
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
  ShieldCheck,
  ArrowRight,
  Tag,
  Phone,
  Mail,
  Droplets,
  RotateCcw,
  Calculator,
  Gauge,
  Settings,
  Sparkles,
  MapPin,
  MousePointerClick,
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

const iconMap: Record<string, React.ReactNode> = {
  "Oil Change": <Droplets className="h-6 w-6" />,
  "Tire Rotation": <RotateCcw className="h-6 w-6" />,
  "Mount & Balance": <Car className="h-6 w-6" />,
  "Brake Service": <Settings className="h-6 w-6" />,
  "Engine Diagnostics": <Gauge className="h-6 w-6" />,
  Estimates: <Calculator className="h-6 w-6" />,
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
      const hint = document.getElementById("selection-hint");
      hint?.scrollIntoView({ behavior: "smooth", block: "center" });
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setStep((prev) => (prev - 1) as Step);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          <div className="w-20 h-20 rounded-full bg-surface-warm border border-border-default flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-10 w-10 text-text-muted" />
          </div>
          <h1 className="font-heading font-black text-2xl text-text-heading uppercase tracking-tight mb-3">
            Shop Closed
          </h1>
          <p className="text-sm text-text-muted font-light mb-8 max-w-xs mx-auto leading-relaxed">
            {shopSettings.maintenanceMessage ||
              "We are currently not accepting appointments."}
          </p>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      {/* ==========================================
          HERO SECTION — Improved with Image Background
          ========================================== */}
      <section className="relative w-full min-h-[320px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2070&auto=format&fit=crop"
            alt="Auto Shop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/85 to-brand-navy/60" />
        </div>

        <div className="container-custom relative z-10 py-16 lg:py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-brand-orange" />
              <span className="text-brand-orange text-xs font-black uppercase tracking-[0.3em]">
                Book Online
              </span>
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight leading-[1.1] mb-4">
              Schedule Your <span className="text-gradient">Service</span>
            </h1>

            <p className="text-white/70 text-lg leading-relaxed max-w-lg">
              Quick, easy, and hassle-free. Complete your booking in just a few
              clicks.
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================
          STICKY PROGRESS BAR
          ========================================== */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-border-default shadow-sm">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {[
              { num: 1, label: "Services" },
              { num: 2, label: "Date" },
              { num: 3, label: "Time" },
              { num: 4, label: "Details" },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center cursor-pointer">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      step > s.num
                        ? "bg-brand-orange text-white"
                        : step === s.num
                          ? "bg-brand-orange text-white ring-4 ring-brand-orange/20"
                          : "bg-surface-warm text-text-muted"
                    }`}
                  >
                    {step > s.num ? <Check size={18} strokeWidth={3} /> : s.num}
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider mt-1.5 hidden sm:block ${
                      step >= s.num ? "text-brand-orange" : "text-text-muted"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < 3 && (
                  <div className="flex-1 h-[3px] mx-2 relative bg-border-default rounded-full overflow-hidden">
                    <div
                      className={`absolute top-0 left-0 h-full bg-gradient-to-r from-brand-orange to-brand-gold rounded-full transition-all duration-500 ${
                        step > s.num ? "w-full" : "w-0"
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ==========================================
          MAIN CONTENT
          ========================================== */}
      <section className="py-10 lg:py-16 bg-surface-warm min-h-[60vh]">
        <div className="container-custom max-w-5xl">
          {/* ==========================================
              STEP 1: SELECT SERVICES — 4 Cards Per Row
              ========================================== */}
          {step === 1 && (
            <div className="space-y-8">
              {/* Instruction Banner */}
              <div
                id="selection-hint"
                className="bg-white rounded-2xl border-2 border-brand-orange/20 p-6 shadow-sm flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0">
                  <MousePointerClick size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-text-heading mb-1">
                    Select Your Services
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    Click on the cards below to select the services you need.
                    You can select multiple services. Selected services will
                    appear in the summary bar above.
                  </p>
                </div>
              </div>

              {/* Selected Count */}
              {selectedServiceIds.length > 0 && (
                <div className="flex items-center gap-3">
                  <Badge
                    variant="default"
                    className="text-sm py-1.5 px-4 cursor-pointer"
                  >
                    <Check size={14} className="mr-1.5" />
                    {selectedServiceIds.length} service
                    {selectedServiceIds.length > 1 ? "s" : ""} selected
                  </Badge>
                  <button
                    onClick={() => setSelectedServiceIds([])}
                    className="text-sm text-text-muted hover:text-brand-orange transition-colors underline cursor-pointer"
                  >
                    Clear all
                  </button>
                </div>
              )}

              {/* Service Cards — 4 per row on desktop */}
              <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {servicesLoading
                  ? [...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="h-64 rounded-3xl bg-surface-gray animate-pulse"
                      />
                    ))
                  : services
                      ?.filter((s) => s.isActive)
                      .map((service) => {
                        const isSelected = selectedServiceIds.includes(
                          service.id,
                        );
                        return (
                          <button
                            key={service.id}
                            onClick={() => handleServiceToggle(service.id)}
                            className={`group relative bg-white border-2 p-5 text-left transition-all duration-300 hover:shadow-lg flex flex-col overflow-hidden rounded-2xl cursor-pointer ${
                              isSelected
                                ? "border-brand-orange shadow-md ring-1 ring-brand-orange/20"
                                : "border-border-default hover:border-brand-orange/50"
                            }`}
                          >
                            {/* Selection Circle — HIGHLIGHTS ON HOVER */}
                            <div
                              className={`absolute top-3 right-3 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                isSelected
                                  ? "bg-brand-orange border-brand-orange text-white scale-110"
                                  : "border-border-default bg-white group-hover:border-brand-orange group-hover:bg-brand-orange/10"
                              }`}
                            >
                              {isSelected && (
                                <Check size={14} strokeWidth={3} />
                              )}
                            </div>

                            {/* Icon */}
                            <div
                              className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                                isSelected
                                  ? "bg-brand-orange text-white shadow-md"
                                  : "bg-surface-warm text-brand-orange group-hover:bg-brand-orange group-hover:text-white"
                              }`}
                            >
                              {iconMap[service.name] || (
                                <Wrench className="h-5 w-5" />
                              )}
                            </div>

                            {/* Content */}
                            <h3
                              className={`font-bold text-base mb-1 transition-colors ${
                                isSelected
                                  ? "text-brand-orange"
                                  : "text-text-heading group-hover:text-brand-orange"
                              }`}
                            >
                              {service.name}
                            </h3>
                            <span className="text-[10px] font-bold text-brand-orange tracking-[0.15em] uppercase bg-brand-orange/10 px-2 py-0.5 rounded-full inline-block mb-3">
                              {service.category || "Service"}
                            </span>

                            <p className="text-xs text-text-muted leading-relaxed mb-4 flex-1 line-clamp-2">
                              {service.description ||
                                "Professional service by certified technicians."}
                            </p>

                            {/* Footer */}
                            <div className="pt-3 border-t border-border-default mt-auto">
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="text-[9px] text-text-muted uppercase tracking-wider font-bold block">
                                    Price
                                  </span>
                                  <span className="text-lg font-black text-brand-orange">
                                    ${Number(service.price).toFixed(2)}
                                  </span>
                                </div>
                                <div className="text-right">
                                  <span className="text-[9px] text-text-muted uppercase tracking-wider font-bold block">
                                    Time
                                  </span>
                                  <span className="text-xs font-bold text-text-heading">
                                    {service.duration} min
                                  </span>
                                </div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
              </div>

              {/* Bottom Action Bar */}
              <div
                className={`fixed bottom-0 left-0 right-0 bg-white border-t border-border-default shadow-[0_-4px_20px_rgba(0,0,0,0.08)] p-4 transition-all duration-300 z-50 ${
                  selectedServiceIds.length > 0
                    ? "translate-y-0"
                    : "translate-y-full"
                }`}
              >
                <div className="container-custom max-w-5xl flex items-center justify-between">
                  <div className="hidden sm:flex items-center gap-6">
                    <div>
                      <span className="text-[10px] text-text-muted uppercase tracking-wider font-bold">
                        Services
                      </span>
                      <div className="text-lg font-black text-text-heading">
                        {selectedServices.length}
                      </div>
                    </div>
                    <div className="w-px h-8 bg-border-default" />
                    <div>
                      <span className="text-[10px] text-text-muted uppercase tracking-wider font-bold">
                        Duration
                      </span>
                      <div className="text-lg font-black text-text-heading">
                        {totalDuration} min
                      </div>
                    </div>
                    <div className="w-px h-8 bg-border-default" />
                    <div>
                      <span className="text-[10px] text-text-muted uppercase tracking-wider font-bold">
                        Total
                      </span>
                      <div className="text-xl font-black text-brand-orange">
                        ${totalPrice.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => setSelectedServiceIds([])}
                      className="text-sm text-text-muted hover:text-brand-orange transition-colors hidden sm:block cursor-pointer"
                    >
                      Clear
                    </button>
                    <Button
                      onClick={handleNext}
                      className="gap-2 w-full sm:w-auto cursor-pointer"
                    >
                      Continue to Date
                      <ArrowRight size={18} />
                    </Button>
                  </div>
                </div>
              </div>

              {selectedServiceIds.length > 0 && <div className="h-24" />}
            </div>
          )}

          {/* ==========================================
              STEP 2: CHOOSE DATE
              ========================================== */}
          {step === 2 && (
            <div className="max-w-lg mx-auto space-y-6">
              <div className="bg-white rounded-2xl border border-border-default p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-text-heading">
                      Select a Date
                    </h2>
                    <p className="text-sm text-text-muted">
                      Choose your preferred appointment date
                    </p>
                  </div>
                </div>

                {!scheduleLoaded && (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin mr-3 text-brand-orange" />
                    <span className="text-sm text-text-muted">
                      Loading available dates...
                    </span>
                  </div>
                )}

                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-5">
                  <button
                    onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                    className="w-11 h-11 rounded-xl border-2 border-border-default flex items-center justify-center hover:border-brand-orange hover:bg-surface-warm transition-all cursor-pointer"
                  >
                    <ChevronLeft className="h-5 w-5 text-text-muted" />
                  </button>
                  <span className="font-heading font-black text-lg uppercase tracking-wider text-text-heading">
                    {format(currentMonth, "MMMM yyyy")}
                  </span>
                  <button
                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                    className="w-11 h-11 rounded-xl border-2 border-border-default flex items-center justify-center hover:border-brand-orange hover:bg-surface-warm transition-all cursor-pointer"
                  >
                    <ChevronRight className="h-5 w-5 text-text-muted" />
                  </button>
                </div>

                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <div
                      key={day}
                      className="text-center text-[10px] font-black uppercase tracking-widest text-text-muted py-2"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: startWeekday }).map((_, index) => (
                    <div key={`empty-${index}`} className="h-12" />
                  ))}
                  {days.map((date) => {
                    const dateStr = format(date, "yyyy-MM-dd");
                    const disabled = disabledDates.has(dateStr);
                    const isSelected = selectedDate === dateStr;
                    const isToday =
                      dateStr === format(new Date(), "yyyy-MM-dd");

                    return (
                      <button
                        key={dateStr}
                        disabled={disabled}
                        onClick={() => setSelectedDate(dateStr)}
                        className={`relative h-12 w-full rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                          disabled
                            ? "bg-surface-gray text-text-light cursor-not-allowed"
                            : isSelected
                              ? "bg-brand-orange text-white shadow-md shadow-orange/20"
                              : isToday
                                ? "ring-2 ring-brand-orange ring-offset-2 bg-white text-brand-orange"
                                : "bg-surface-warm text-text-heading hover:bg-brand-orange/10 hover:text-brand-orange"
                        }`}
                      >
                        {format(date, "d")}
                        {isToday && !isSelected && (
                          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-orange rounded-full" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 mt-4 text-xs text-text-muted">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded bg-brand-orange" />
                    <span>Selected</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded ring-2 ring-brand-orange bg-white" />
                    <span>Today</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded bg-surface-gray" />
                    <span>Unavailable</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="gap-2 cursor-pointer"
                >
                  <ChevronLeft size={16} />
                  Back to Services
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!selectedDate}
                  className="gap-2 cursor-pointer"
                >
                  Continue to Time
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          )}

          {/* ==========================================
              STEP 3: PICK TIME
              ========================================== */}
          {step === 3 && (
            <div className="max-w-lg mx-auto space-y-6">
              <div className="bg-white rounded-2xl border border-border-default p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-text-heading">
                      Pick a Time
                    </h2>
                    <p className="text-sm text-text-muted">
                      {selectedDate} · {totalDuration} minutes total
                    </p>
                  </div>
                </div>

                {slotsLoading ? (
                  <div className="flex h-40 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-brand-orange" />
                  </div>
                ) : !availableSlots || availableSlots.length === 0 ? (
                  <div className="flex h-40 flex-col items-center justify-center bg-surface-warm rounded-2xl border-2 border-dashed border-border-default">
                    <AlertCircle className="h-10 w-10 mb-3 text-text-light" />
                    <p className="text-sm font-bold text-text-muted">
                      No slots available
                    </p>
                    <p className="text-xs text-text-light mt-1">
                      Try selecting a different date
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`rounded-xl border-2 px-3 py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                          selectedTime === slot
                            ? "border-brand-orange bg-brand-orange text-white shadow-md shadow-orange/20"
                            : "border-border-default bg-surface-warm text-text-heading hover:border-brand-orange/40 hover:bg-brand-orange/5"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="gap-2 cursor-pointer"
                >
                  <ChevronLeft size={16} />
                  Back to Date
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!selectedTime || slotsLoading}
                  className="gap-2 cursor-pointer"
                >
                  Continue
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          )}

          {/* ==========================================
              STEP 4: YOUR INFORMATION
              ========================================== */}
          {step === 4 && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-white rounded-2xl border border-border-default p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                    <User size={20} />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-text-heading">
                      Your Details
                    </h2>
                    <p className="text-sm text-text-muted">
                      Fill in your information to complete the booking
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input
                      label="Full Name"
                      placeholder="John Doe"
                      error={errors.name?.message}
                      icon={<User size={18} />}
                      {...register("name")}
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="john@example.com"
                      error={errors.email?.message}
                      icon={<Mail size={18} />}
                      {...register("email")}
                    />
                  </div>
                  <Input
                    label="Phone"
                    placeholder="(555) 123-4567"
                    error={errors.phone?.message}
                    icon={<Phone size={18} />}
                    {...register("phone")}
                  />

                  <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-2">
                      <Car size={16} className="text-brand-orange" />
                      <span className="text-xs font-black uppercase tracking-widest text-text-muted">
                        Vehicle Information
                      </span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
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
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-text-muted">
                      Notes{" "}
                      <span className="text-text-light font-normal">
                        (Optional)
                      </span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Any special requests..."
                      className="flex w-full rounded-2xl border-2 border-border-default bg-surface-warm px-4 py-3.5 text-sm font-medium text-text-heading placeholder:text-text-light focus-visible:outline-none focus-visible:border-brand-orange transition-colors resize-none"
                      {...register("notes")}
                    />
                  </div>

                  {/* Summary */}
                  <div className="rounded-2xl bg-surface-warm border border-border-default p-6 space-y-3">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border-default">
                      <Tag size={14} className="text-brand-orange" />
                      <span className="text-xs font-black uppercase tracking-widest text-brand-orange">
                        Booking Summary
                      </span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3 text-sm">
                      <div className="flex justify-between sm:block">
                        <span className="text-text-muted">Date</span>
                        <span className="font-bold text-text-heading">
                          {selectedDate}
                        </span>
                      </div>
                      <div className="flex justify-between sm:block">
                        <span className="text-text-muted">Time</span>
                        <span className="font-bold text-text-heading">
                          {selectedTime}
                        </span>
                      </div>
                      <div className="flex justify-between sm:block">
                        <span className="text-text-muted">Duration</span>
                        <span className="font-bold text-text-heading">
                          {totalDuration} min
                        </span>
                      </div>
                      <div className="flex justify-between sm:block">
                        <span className="text-text-muted">Services</span>
                        <span className="font-bold text-text-heading">
                          {selectedServices.length}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {selectedServices.map((s) => (
                        <span
                          key={s.id}
                          className="text-[10px] font-bold uppercase tracking-wider bg-white border border-border-default px-3 py-1.5 rounded-full text-text-heading"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-end pt-4 border-t border-border-default">
                      <span className="text-xs font-black uppercase tracking-widest text-brand-orange">
                        Total
                      </span>
                      <span className="font-heading font-black text-2xl text-brand-orange">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      className="gap-2 cursor-pointer"
                    >
                      <ChevronLeft size={16} /> Back
                    </Button>
                    <Button
                      type="submit"
                      isLoading={isSubmitting}
                      disabled={isSubmitting}
                      className="gap-2 cursor-pointer"
                    >
                      <ShieldCheck size={18} /> Confirm Booking
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ==========================================
              STEP 5: CONFIRMATION
              ========================================== */}
          {step === 5 && (
            <div className="max-w-md mx-auto text-center py-12">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-orange/10 to-brand-gold/10 border-2 border-brand-orange/20 flex items-center justify-center mx-auto mb-8">
                <Check
                  size={48}
                  className="text-brand-orange"
                  strokeWidth={2.5}
                />
              </div>
              <div className="space-y-3 mb-10">
                <h2 className="font-heading font-black text-3xl text-text-heading uppercase tracking-tight">
                  Booking <span className="text-gradient">Confirmed!</span>
                </h2>
                <p className="text-text-muted leading-relaxed max-w-sm mx-auto">
                  Your appointment is scheduled. A confirmation email has been
                  sent.
                </p>
              </div>
              <div className="bg-white rounded-3xl border-2 border-border-default p-8 mb-8 text-left shadow-sm">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border-default">
                  <Sparkles size={16} className="text-brand-orange" />
                  <span className="text-xs font-black uppercase tracking-widest text-brand-orange">
                    Appointment Details
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-text-muted">Services</span>
                    <span className="text-sm font-bold text-text-heading text-right">
                      {selectedServices.map((s) => s.name).join(", ")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-text-muted">Date</span>
                    <span className="text-sm font-bold text-text-heading">
                      {selectedDate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-text-muted">Time</span>
                    <span className="text-sm font-bold text-text-heading">
                      {selectedTime}
                    </span>
                  </div>
                  <div className="flex justify-between items-end pt-4 border-t border-border-default">
                    <span className="text-xs font-black uppercase tracking-widest text-brand-orange">
                      Total
                    </span>
                    <span className="font-heading font-black text-2xl text-brand-orange">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => navigate("/")}
                  size="md"
                  className="gap-2 cursor-pointer"
                >
                  <MapPin size={18} /> Back to Home
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                  size="md"
                  className="cursor-pointer"
                >
                  Book Another
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
