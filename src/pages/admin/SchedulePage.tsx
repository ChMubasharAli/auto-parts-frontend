import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useSchedule,
  useUpdateSchedule,
  useBlockedSlots,
  useCreateBlockedSlot,
  useDeleteBlockedSlot,
  useDayOffs,
  useCreateDayOff,
  useDeleteDayOff,
  useUpdateSlotInterval,
} from "../../hooks/useSchedule";
import { useToast } from "../../components/ui/Toast";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
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
  Clock,
  CalendarX,
  Ban,
  Plus,
  Trash2,
  Save,
  Settings2,
} from "lucide-react";

const dayOrder = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const blockedSlotSchema = z
  .object({
    date: z.string().min(1, "Date is required"),
    startTime: z
      .string()
      .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time (HH:mm)"),
    endTime: z
      .string()
      .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time (HH:mm)"),
    reason: z.string().max(200).optional(),
  })
  .refine(
    (data) => {
      const [sh, sm] = data.startTime.split(":").map(Number);
      const [eh, em] = data.endTime.split(":").map(Number);
      return eh * 60 + em > sh * 60 + sm;
    },
    { message: "End time must be after start time", path: ["endTime"] },
  );

const dayOffSchema = z.object({
  date: z.string().min(1, "Date is required"),
  reason: z.string().max(200).optional(),
});

type BlockedSlotForm = z.infer<typeof blockedSlotSchema>;
type DayOffForm = z.infer<typeof dayOffSchema>;

export const SchedulePage = () => {
  const { showToast } = useToast();
  const { data: scheduleData, isLoading: scheduleLoading } = useSchedule();
  const { data: blockedSlots, isLoading: blockedLoading } = useBlockedSlots();
  const { data: dayOffs, isLoading: dayOffsLoading } = useDayOffs();

  const updateSchedule = useUpdateSchedule();
  const createBlockedSlot = useCreateBlockedSlot();
  const deleteBlockedSlot = useDeleteBlockedSlot();
  const createDayOff = useCreateDayOff();
  const deleteDayOff = useDeleteDayOff();
  const updateSlotInterval = useUpdateSlotInterval();

  const [editingDay, setEditingDay] = useState<string | null>(null);
  const [dayForm, setDayForm] = useState({
    isOpen: true,
    startTime: "07:00",
    endTime: "17:00",
  });

  const [blockedModalOpen, setBlockedModalOpen] = useState(false);
  const [dayOffModalOpen, setDayOffModalOpen] = useState(false);
  const [slotIntervalValue, setSlotIntervalValue] = useState<number>(
    scheduleData?.slotInterval || 30,
  );

  const blockedForm = useForm<BlockedSlotForm>({
    resolver: zodResolver(blockedSlotSchema),
    defaultValues: { date: "", startTime: "", endTime: "", reason: "" },
  });

  const dayOffForm = useForm<DayOffForm>({
    resolver: zodResolver(dayOffSchema),
    defaultValues: { date: "", reason: "" },
  });

  const handleSaveDay = async (day: string) => {
    try {
      await updateSchedule.mutateAsync({ day, data: dayForm });
      showToast(`${day} schedule updated`, "success");
      setEditingDay(null);
    } catch (error: any) {
      showToast(
        error?.response?.data?.message || "Failed to update schedule",
        "error",
      );
    }
  };

  const handleCreateBlockedSlot = async (data: BlockedSlotForm) => {
    try {
      await createBlockedSlot.mutateAsync(data);
      showToast("Blocked slot created", "success");
      setBlockedModalOpen(false);
      blockedForm.reset();
    } catch (error: any) {
      showToast(
        error?.response?.data?.message || "Failed to create blocked slot",
        "error",
      );
    }
  };

  const handleCreateDayOff = async (data: DayOffForm) => {
    try {
      await createDayOff.mutateAsync(data);
      showToast("Day off created", "success");
      setDayOffModalOpen(false);
      dayOffForm.reset();
    } catch (error: any) {
      showToast(
        error?.response?.data?.message || "Failed to create day off",
        "error",
      );
    }
  };

  const handleDeleteBlocked = async (id: string) => {
    try {
      await deleteBlockedSlot.mutateAsync(id);
      showToast("Blocked slot deleted", "success");
    } catch (error: any) {
      showToast(error?.response?.data?.message || "Failed to delete", "error");
    }
  };

  const handleDeleteDayOff = async (id: string) => {
    try {
      await deleteDayOff.mutateAsync(id);
      showToast("Day off deleted", "success");
    } catch (error: any) {
      showToast(error?.response?.data?.message || "Failed to delete", "error");
    }
  };

  const handleUpdateSlotInterval = async () => {
    try {
      await updateSlotInterval.mutateAsync(slotIntervalValue);
      showToast("Slot interval updated", "success");
    } catch (error: any) {
      showToast(error?.response?.data?.message || "Failed to update", "error");
    }
  };

  const scheduleMap = new Map(
    scheduleData?.schedule?.map((s: any) => [s.day, s]),
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Schedule Management
        </h1>
        <p className="text-[var(--color-muted-foreground)]">
          Configure working hours, blocked slots, and day offs
        </p>
      </div>

      {/* Weekly Schedule */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-[var(--color-muted-foreground)]" />
            <CardTitle>Weekly Schedule</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {scheduleLoading ? (
            <div className="space-y-2">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 animate-pulse rounded bg-[var(--color-muted)]"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {dayOrder.map((day) => {
                const schedule = scheduleMap.get(day);
                const isEditing = editingDay === day;

                return (
                  <div
                    key={day}
                    className="flex flex-col gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-3 min-w-[120px]">
                      <span className="font-medium w-24">{day}</span>
                      <Badge
                        variant={schedule?.isOpen ? "success" : "secondary"}
                      >
                        {schedule?.isOpen ? "Open" : "Closed"}
                      </Badge>
                    </div>

                    {isEditing ? (
                      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={dayForm.isOpen}
                            onChange={(e) =>
                              setDayForm({
                                ...dayForm,
                                isOpen: e.target.checked,
                              })
                            }
                            className="h-4 w-4"
                          />
                          <span className="text-sm">Open</span>
                        </label>
                        {dayForm.isOpen && (
                          <>
                            <Input
                              type="time"
                              className="w-full sm:w-32"
                              value={dayForm.startTime}
                              onChange={(e) =>
                                setDayForm({
                                  ...dayForm,
                                  startTime: e.target.value,
                                })
                              }
                            />
                            <span className="text-[var(--color-muted-foreground)]">
                              to
                            </span>
                            <Input
                              type="time"
                              className="w-full sm:w-32"
                              value={dayForm.endTime}
                              onChange={(e) =>
                                setDayForm({
                                  ...dayForm,
                                  endTime: e.target.value,
                                })
                              }
                            />
                          </>
                        )}
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleSaveDay(day)}
                            isLoading={updateSchedule.isPending}
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingDay(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-1 items-center justify-between gap-4">
                        <span className="text-sm text-[var(--color-muted-foreground)]">
                          {schedule?.isOpen
                            ? `${schedule.startTime} - ${schedule.endTime}`
                            : "Closed all day"}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingDay(day);
                            setDayForm({
                              isOpen: schedule?.isOpen ?? true,
                              startTime: schedule?.startTime || "07:00",
                              endTime: schedule?.endTime || "17:00",
                            });
                          }}
                        >
                          Edit
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Slot Interval */}

      {/* Blocked Slots */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Ban className="h-5 w-5 text-[var(--color-muted-foreground)]" />
            <CardTitle>Blocked Slots</CardTitle>
          </div>
          <Button
            size="sm"
            onClick={() => setBlockedModalOpen(true)}
            className="gap-1"
          >
            <Plus className="h-4 w-4" />
            Block Slot
          </Button>
        </CardHeader>
        <CardContent>
          {blockedLoading ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 animate-pulse rounded bg-[var(--color-muted)]"
                />
              ))}
            </div>
          ) : !blockedSlots || blockedSlots.length === 0 ? (
            <div className="flex h-24 items-center justify-center text-sm text-[var(--color-muted-foreground)]">
              No blocked slots
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blockedSlots.map((slot: any) => (
                  <TableRow key={slot.id}>
                    <TableCell>{slot.date?.toString().split("T")[0]}</TableCell>
                    <TableCell>
                      {slot.startTime} - {slot.endTime}
                    </TableCell>
                    <TableCell className="text-[var(--color-muted-foreground)]">
                      {slot.reason || "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteBlocked(slot.id)}
                      >
                        <Trash2 className="h-4 w-4 text-[var(--color-destructive)]" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Day Offs */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarX className="h-5 w-5 text-[var(--color-muted-foreground)]" />
            <CardTitle>Day Offs</CardTitle>
          </div>
          <Button
            size="sm"
            onClick={() => setDayOffModalOpen(true)}
            className="gap-1"
          >
            <Plus className="h-4 w-4" />
            Add Day Off
          </Button>
        </CardHeader>
        <CardContent>
          {dayOffsLoading ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 animate-pulse rounded bg-[var(--color-muted)]"
                />
              ))}
            </div>
          ) : !dayOffs || dayOffs.length === 0 ? (
            <div className="flex h-24 items-center justify-center text-sm text-[var(--color-muted-foreground)]">
              No day offs set
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dayOffs.map((dayOff: any) => (
                  <TableRow key={dayOff.id}>
                    <TableCell>
                      {dayOff.date?.toString().split("T")[0]}
                    </TableCell>
                    <TableCell className="text-[var(--color-muted-foreground)]">
                      {dayOff.reason || "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteDayOff(dayOff.id)}
                      >
                        <Trash2 className="h-4 w-4 text-[var(--color-destructive)]" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Blocked Slot Modal */}
      <Modal
        isOpen={blockedModalOpen}
        onClose={() => {
          setBlockedModalOpen(false);
          blockedForm.reset();
        }}
        title="Block Time Slot"
      >
        <form
          onSubmit={blockedForm.handleSubmit(handleCreateBlockedSlot)}
          className="space-y-4"
        >
          <Input
            label="Date"
            type="date"
            error={blockedForm.formState.errors.date?.message}
            {...blockedForm.register("date")}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Start Time"
              type="time"
              error={blockedForm.formState.errors.startTime?.message}
              {...blockedForm.register("startTime")}
            />
            <Input
              label="End Time"
              type="time"
              error={blockedForm.formState.errors.endTime?.message}
              {...blockedForm.register("endTime")}
            />
          </div>
          <Input
            label="Reason (optional)"
            placeholder="e.g. Staff meeting"
            error={blockedForm.formState.errors.reason?.message}
            {...blockedForm.register("reason")}
          />
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setBlockedModalOpen(false);
                blockedForm.reset();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={createBlockedSlot.isPending}>
              Block Slot
            </Button>
          </div>
        </form>
      </Modal>

      {/* Day Off Modal */}
      <Modal
        isOpen={dayOffModalOpen}
        onClose={() => {
          setDayOffModalOpen(false);
          dayOffForm.reset();
        }}
        title="Add Day Off"
      >
        <form
          onSubmit={dayOffForm.handleSubmit(handleCreateDayOff)}
          className="space-y-4"
        >
          <Input
            label="Date"
            type="date"
            error={dayOffForm.formState.errors.date?.message}
            {...dayOffForm.register("date")}
          />
          <Input
            label="Reason (optional)"
            placeholder="e.g. Holiday"
            error={dayOffForm.formState.errors.reason?.message}
            {...dayOffForm.register("reason")}
          />
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setDayOffModalOpen(false);
                dayOffForm.reset();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={createDayOff.isPending}>
              Add Day Off
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
