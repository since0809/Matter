import { cn } from "@/lib/utils";
import { KeyRound } from "lucide-react";

interface KeyStatusProps {
  active?: boolean;
  pulse?: boolean;
  className?: string;
}

export const KeyStatus = ({ active = false, pulse = false, className }: KeyStatusProps) => {
  return (
    <div
      className={cn(
        "relative inline-flex h-12 w-12 items-center justify-center rounded-full border-2",
        active
          ? "border-brand-soft bg-gradient-to-br from-brand-soft/80 via-brand-soft to-brand-soft/70"
          : "border-border bg-gradient-to-br from-muted/80 via-muted to-muted/70",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-full",
          pulse && active ? "animate-pulse-subtle" : "",
        )}
      />
      <KeyRound
        className={cn(
          "relative h-6 w-6",
          active ? "text-brand-foreground" : "text-brand-key-muted",
        )}
        strokeWidth={2.2}
      />
    </div>
  );
};
