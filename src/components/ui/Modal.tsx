import { cn } from "../../lib/utils";
import { X } from "lucide-react";
import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div
        className="fixed inset-0 bg-brand-navy/70 backdrop-blur-md"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative z-50 w-full max-w-lg rounded-3xl border border-white/10 bg-surface-white p-8 shadow-2xl overflow-hidden",
          className,
        )}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading font-bold text-xl text-text-heading">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-surface-gray flex items-center justify-center hover:bg-brand-orange/10 hover:text-brand-orange transition-all cursor-pointer group"
          >
            <X
              size={18}
              className="text-text-muted group-hover:text-brand-orange"
            />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
