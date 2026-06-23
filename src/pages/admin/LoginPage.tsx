import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useAuth";
import { useToast } from "../../components/ui/Toast";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/Card";
import { Wrench } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await loginMutation.mutateAsync(data);
      if (result.success && result.data?.token) {
        showToast("Login successful!", "success");
        navigate("/admin/dashboard");
      } else {
        showToast(result.message || "Login failed", "error");
      }
    } catch (error: any) {
      showToast(
        error?.response?.data?.message || "Invalid credentials",
        "error",
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-muted)]/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2"></div>
          <CardTitle className="text-2xl">Welcome Back!</CardTitle>
          <CardDescription>Please Login</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="test@gmail.com"
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              error={errors.password?.message}
              {...register("password")}
            />
            <Button
              type="submit"
              className="w-full"
              isLoading={loginMutation.isPending}
              disabled={loginMutation.isPending}
            >
              Sign In
            </Button>
          </form>
          {/* <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => navigate("/admin/forgot-password")}
              className="text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:underline"
            >
              Forgot password?
            </button>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
};
