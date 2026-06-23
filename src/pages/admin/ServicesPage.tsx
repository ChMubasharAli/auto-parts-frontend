import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useServices,
  useCreateService,
  useUpdateService,
  useDeleteService,
  useToggleServiceStatus,
} from "../../hooks/useServices";
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
import { Wrench, Plus, Pencil, Trash2, Power, PowerOff } from "lucide-react";

const serviceSchema = z.object({
  name: z.string().min(1, "Service name is required").max(100),
  description: z.string().max(500).optional().or(z.literal("")),
  duration: z.coerce
    .number()
    .int()
    .min(1, "Minimum 1 minute")
    .max(480, "Max 8 hours"),
  price: z.coerce
    .number()
    .min(0, "Price cannot be negative")
    .optional()
    .or(z.literal("")),
  isActive: z.boolean().default(true),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

export const ServicesPage = () => {
  const { data: services, isLoading } = useServices();
  const { showToast } = useToast();
  const createMutation = useCreateService();
  const updateMutation = useUpdateService();
  const deleteMutation = useDeleteService();
  const toggleMutation = useToggleServiceStatus();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: "",
      description: "",
      duration: 30,
      price: "" as any,
      isActive: true,
    },
  });

  const openCreateModal = () => {
    setEditingService(null);
    reset({
      name: "",
      description: "",
      duration: 30,
      price: "" as any,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (service: any) => {
    setEditingService(service.id);
    setValue("name", service.name);
    setValue("description", service.description || "");
    setValue("duration", service.duration);
    setValue("price", service.price ? Number(service.price) : ("" as any));
    setValue("isActive", service.isActive);
    setIsModalOpen(true);
  };

  const onSubmit = async (data: ServiceFormData) => {
    try {
      const payload = {
        ...data,
        description: data.description || null,
        price: data.price ? Number(data.price) : null,
      };

      if (editingService) {
        await updateMutation.mutateAsync({ id: editingService, data: payload });
        showToast("Service updated successfully", "success");
      } else {
        await createMutation.mutateAsync(payload);
        showToast("Service created successfully", "success");
      }
      setIsModalOpen(false);
      reset();
    } catch (error: any) {
      showToast(
        error?.response?.data?.message || "Something went wrong",
        "error",
      );
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      showToast("Service deleted successfully", "success");
      setDeleteConfirm(null);
    } catch (error: any) {
      showToast(
        error?.response?.data?.message || "Failed to delete service",
        "error",
      );
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await toggleMutation.mutateAsync(id);
      showToast("Service status updated", "success");
    } catch (error: any) {
      showToast(
        error?.response?.data?.message || "Failed to update status",
        "error",
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-[var(--color-muted-foreground)]">
            Manage your shop services
          </p>
        </div>
        <Button onClick={openCreateModal} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Service
        </Button>
      </div>

      {/* Services Table */}
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
          ) : !services || services.length === 0 ? (
            <div className="flex h-32 items-center justify-center text-[var(--color-muted-foreground)]">
              No services found. Add your first service.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Wrench className="h-4 w-4 text-[var(--color-muted-foreground)]" />
                        {service.name}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate text-[var(--color-muted-foreground)]">
                      {service.description || "—"}
                    </TableCell>
                    <TableCell>{service.duration} min</TableCell>
                    <TableCell>
                      {service.price
                        ? `$${Number(service.price).toFixed(2)}`
                        : "—"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={service.isActive ? "success" : "secondary"}
                      >
                        {service.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggle(service.id)}
                          title={service.isActive ? "Disable" : "Enable"}
                        >
                          {service.isActive ? (
                            <PowerOff className="h-4 w-4 text-orange-500" />
                          ) : (
                            <Power className="h-4 w-4 text-green-500" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditModal(service)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteConfirm(service.id)}
                        >
                          <Trash2 className="h-4 w-4 text-[var(--color-destructive)]" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingService ? "Edit Service" : "Add Service"}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Service Name"
            placeholder="e.g. Oil Change"
            error={errors.name?.message}
            {...register("name")}
          />
          <Input
            label="Description (optional)"
            placeholder="Brief description of the service..."
            error={errors.description?.message}
            {...register("description")}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Duration (minutes)"
              type="number"
              placeholder="30"
              error={errors.duration?.message}
              {...register("duration")}
            />
            <Input
              label="Price ($) - Optional"
              type="number"
              step="0.01"
              placeholder="0.00"
              error={errors.price?.message}
              {...register("price")}
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              {...register("isActive")}
              className="h-4 w-4 rounded border-[var(--color-border)]"
            />
            <label htmlFor="isActive" className="text-sm font-medium">
              Active (visible to customers)
            </label>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={createMutation.isPending || updateMutation.isPending}
            >
              {editingService ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Service"
      >
        <p className="text-[var(--color-muted-foreground)]">
          Are you sure you want to delete this service? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
            isLoading={deleteMutation.isPending}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};
