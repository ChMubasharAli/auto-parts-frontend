import { cn } from "../../lib/utils";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  glass?: boolean;
}

export const Card = ({ children, className, glass = false }: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border-default bg-surface-white text-text-heading shadow-sm transition-all duration-300 hover:shadow-lg hover:border-brand-orange/20",
        glass && "glass border-white/20",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className }: CardProps) => {
  return (
    <div className={cn("flex flex-col space-y-2 p-6", className)}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className }: CardProps) => {
  return (
    <h3
      className={cn(
        "font-heading font-bold text-xl text-text-heading tracking-tight",
        className,
      )}
    >
      {children}
    </h3>
  );
};

export const CardDescription = ({ children, className }: CardProps) => {
  return (
    <p
      className={cn(
        "text-sm text-text-muted font-normal leading-relaxed",
        className,
      )}
    >
      {children}
    </p>
  );
};

export const CardContent = ({ children, className }: CardProps) => {
  return <div className={cn("p-6 pt-0", className)}>{children}</div>;
};

export const CardFooter = ({ children, className }: CardProps) => {
  return (
    <div className={cn("flex items-center p-6 pt-0", className)}>
      {children}
    </div>
  );
};
