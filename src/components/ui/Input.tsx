import { cn } from "../../lib/utils";
import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-[var(--radius-md)] border border-[var(--color-input)] bg-transparent px-3 py-2 text-sm placeholder:text-[var(--color-muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] disabled:cursor-not-allowed disabled:opacity-50",
            error &&
              "border-[var(--color-destructive)] focus-visible:ring-[var(--color-destructive)]",
            className,
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-[var(--color-destructive)]">{error}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
