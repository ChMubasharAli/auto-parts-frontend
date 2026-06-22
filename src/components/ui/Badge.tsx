import { cn } from "../../lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "success"
    | "gold";
  className?: string;
}

export const Badge = ({
  children,
  variant = "default",
  className,
}: BadgeProps) => {
  const variants = {
    default:
      "bg-brand-orange/10 text-brand-orange border border-brand-orange/20",
    secondary: "bg-brand-navy/10 text-brand-navy border border-brand-navy/20",
    gold: "bg-brand-gold/10 text-brand-gold-dark border border-brand-gold/30",
    destructive:
      "bg-destructive/10 text-destructive border border-destructive/20",
    outline: "border border-border-default text-text-body bg-surface-white",
    success: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider transition-colors",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
};
