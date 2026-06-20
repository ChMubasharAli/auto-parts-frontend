import { cn } from "../../lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "destructive" | "outline" | "success";
  className?: string;
}

export const Badge = ({
  children,
  variant = "default",
  className,
}: BadgeProps) => {
  const variants = {
    default: "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]",
    secondary:
      "bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)]",
    destructive:
      "bg-[var(--color-destructive)] text-[var(--color-destructive-foreground)]",
    outline:
      "border border-[var(--color-border)] text-[var(--color-foreground)]",
    success: "bg-green-500 text-white",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
};
