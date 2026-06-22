import { cn } from "../../lib/utils";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "gradient";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  const variants = {
    primary:
      "bg-brand-orange text-white hover:bg-brand-orange-dark shadow-brand-gold hover:shadow-lg",
    secondary:
      "bg-brand-navy text-white hover:bg-brand-navy-light shadow-brand-gold hover:shadow-lg ",
    gradient:
      "bg-gradient-to-r from-brand-orange to-brand-orange text-white shadow-brand-gold hover:shadow-lg",
    destructive: "bg-destructive text-destructive-foreground hover:opacity-90",
    outline:
      "border-2 border-brand-orange text-brand-orange  shadow-brand-gold hover:shadow-lg ",
    ghost: "hover:bg-surface-warm text-text-body hover:text-brand-orange",
  };

  const sizes = {
    sm: "h-10 px-5 text-xs",
    md: "h-12 px-8 text-sm",
    lg: "h-14 px-10 text-base",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center cursor-pointer  justify-center rounded-2xl font-bold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/50 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          className="mr-2 h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : null}
      {children}
    </button>
  );
};
