import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useShopSettings,
  useUpdateShopSettings,
} from "../../hooks/useSettings";
import { useAuthContext } from "../../context/AuthContext";
import { useUpdateProfile, useChangePassword } from "../../hooks/useAuth";
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
import { Store, User, Lock, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email"),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "Minimum 6 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ProfileForm = z.infer<typeof profileSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;

export const SettingsPage = () => {
  const { showToast } = useToast();
  const { admin, logout } = useAuthContext();
  const navigate = useNavigate();

  const { data: shopSettings, isLoading: settingsLoading } = useShopSettings();
  const updateShopSettings = useUpdateShopSettings();
  const updateProfile = useUpdateProfile();
  const changePassword = useChangePassword();

  const [shopStatus, setShopStatus] = useState<"Open" | "Closed">(
    shopSettings?.shopStatus || "Open",
  );
  const [maintenanceMessage, setMaintenanceMessage] = useState(
    shopSettings?.maintenanceMessage || "",
  );

  const profileForm = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: admin?.name || "",
      email: admin?.email || "",
    },
  });

  const passwordForm = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleUpdateShop = async () => {
    try {
      await updateShopSettings.mutateAsync({
        shopStatus,
        maintenanceMessage: maintenanceMessage || undefined,
      });
      showToast("Shop settings updated", "success");
    } catch (error: any) {
      showToast(error?.response?.data?.message || "Failed to update", "error");
    }
  };

  // const handleUpdateProfile = async (data: ProfileForm) => {
  //   try {
  //     await updateProfile.mutateAsync(data);
  //     showToast("Profile updated successfully", "success");
  //   } catch (error: any) {
  //     showToast(
  //       error?.response?.data?.message || "Failed to update profile",
  //       "error",
  //     );
  //   }
  // };

  const handleChangePassword = async (data: PasswordForm) => {
    try {
      await changePassword.mutateAsync({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });
      showToast("Password changed successfully", "success");
      passwordForm.reset();
      logout();
      navigate("/");
    } catch (error: any) {
      showToast(
        error?.response?.data?.message || "Failed to change password",
        "error",
      );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-[var(--color-muted-foreground)]">
          Manage shop settings and your account
        </p>
      </div>

      {/* Shop Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5 text-[var(--color-muted-foreground)]" />
            <CardTitle>Shop Status</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {settingsLoading ? (
            <div className="h-20 animate-pulse rounded bg-[var(--color-muted)]" />
          ) : (
            <>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShopStatus("Open")}
                    className={`flex items-center gap-2 rounded-[var(--radius-md)] border px-4 py-2 text-sm font-medium transition-colors ${
                      shopStatus === "Open"
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-[var(--color-border)] hover:bg-[var(--color-muted)]"
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    Open
                  </button>
                  <button
                    onClick={() => setShopStatus("Closed")}
                    className={`flex items-center gap-2 rounded-[var(--radius-md)] border px-4 py-2 text-sm font-medium transition-colors ${
                      shopStatus === "Closed"
                        ? "border-red-500 bg-red-50 text-red-700"
                        : "border-[var(--color-border)] hover:bg-[var(--color-muted)]"
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    Closed
                  </button>
                </div>
                <Badge
                  variant={
                    shopSettings?.shopStatus === "Open"
                      ? "success"
                      : "destructive"
                  }
                >
                  Current: {shopSettings?.shopStatus}
                </Badge>
              </div>

              {shopStatus === "Closed" && (
                <div>
                  <label className="text-sm font-medium">
                    Maintenance Message
                  </label>
                  <p className="text-xs text-[var(--color-muted-foreground)] mb-1">
                    This message will be shown to customers when shop is closed
                  </p>
                  <textarea
                    rows={2}
                    value={maintenanceMessage}
                    onChange={(e) => setMaintenanceMessage(e.target.value)}
                    placeholder="We are currently not accepting appointments."
                    className="flex w-full rounded-[var(--radius-md)] border border-[var(--color-input)] bg-transparent px-3 py-2 text-sm placeholder:text-[var(--color-muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
                  />
                </div>
              )}

              <Button
                onClick={handleUpdateShop}
                isLoading={updateShopSettings.isPending}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                Save Shop Settings
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Admin Profile */}
      {/* <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-[var(--color-muted-foreground)]" />
            <CardTitle>Admin Profile</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={profileForm.handleSubmit(handleUpdateProfile)}
            className="space-y-4"
          >
            <Input
              label="Name"
              placeholder="Your name"
              error={profileForm.formState.errors.name?.message}
              {...profileForm.register("name")}
            />
            <Input
              label="Email"
              type="email"
              placeholder="admin@westmaintire.com"
              error={profileForm.formState.errors.email?.message}
              {...profileForm.register("email")}
            />
            <Button
              type="submit"
              isLoading={updateProfile.isPending}
              className="gap-2"
            >
              <Save className="h-4 w-4" />
              Update Profile
            </Button>
          </form>
        </CardContent>
      </Card> */}

      {/* Change Password */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-[var(--color-muted-foreground)]" />
            <CardTitle>Change Password</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={passwordForm.handleSubmit(handleChangePassword)}
            className="space-y-4"
          >
            <Input
              label="Current Password"
              type="password"
              placeholder="Enter current password"
              error={passwordForm.formState.errors.currentPassword?.message}
              {...passwordForm.register("currentPassword")}
            />
            <Input
              label="New Password"
              type="password"
              placeholder="Minimum 6 characters"
              error={passwordForm.formState.errors.newPassword?.message}
              {...passwordForm.register("newPassword")}
            />
            <Input
              label="Confirm New Password"
              type="password"
              placeholder="Re-enter new password"
              error={passwordForm.formState.errors.confirmPassword?.message}
              {...passwordForm.register("confirmPassword")}
            />
            <Button
              type="submit"
              isLoading={changePassword.isPending}
              className="gap-2"
            >
              <Lock className="h-4 w-4" />
              Change Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
