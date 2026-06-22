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
    <div className="w-full overflow-auto rounded-2xl border border-border-default shadow-sm">
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
  return <thead className={cn("bg-surface-gray", className)}>{children}</thead>;
};

export const TableBody = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <tbody className={cn("divide-y divide-border-default", className)}>
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
    <tr className={cn("transition-colors hover:bg-surface-warm/50", className)}>
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
        "h-14 px-5 text-left align-middle text-xs font-bold uppercase tracking-wider text-text-muted",
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
  return (
    <td className={cn("p-5 align-middle text-text-body", className)}>
      {children}
    </td>
  );
};
