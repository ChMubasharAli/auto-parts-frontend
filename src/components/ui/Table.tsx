import { cn } from "../../lib/utils";
import type { ReactNode } from "react";

export const Table = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className="w-full overflow-auto">
      <table className={cn("w-full caption-bottom text-sm", className)}>
        {children}
      </table>
    </div>
  );
};

export const TableHeader = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <thead className={cn("[&_tr]:border-b", className)}>{children}</thead>;
};

export const TableBody = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <tbody className={cn("[&_tr:last-child]:border-0", className)}>
      {children}
    </tbody>
  );
};

export const TableRow = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <tr
      className={cn(
        "border-b border-[var(--color-border)] transition-colors hover:bg-[var(--color-muted)]/50 data-[state=selected]:bg-[var(--color-muted)]",
        className,
      )}
    >
      {children}
    </tr>
  );
};

export const TableHead = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <th
      className={cn(
        "h-12 px-4 text-left align-middle font-medium text-[var(--color-muted-foreground)]",
        className,
      )}
    >
      {children}
    </th>
  );
};

export const TableCell = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <td className={cn("p-4 align-middle", className)}>{children}</td>;
};
