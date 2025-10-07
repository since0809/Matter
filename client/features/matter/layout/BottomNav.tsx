import { cn } from "@/lib/utils";
import {
  CalendarDays,
  ListChecks,
  Sparkles,
  Tag,
  UserRound,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const navItems = [
  {
    to: "/",
    label: "List",
    icon: ListChecks,
    end: true,
  },
  {
    to: "/calendar",
    label: "Calendar",
    icon: CalendarDays,
  },
  {
    to: "/inspire",
    label: "Inspire",
    icon: Sparkles,
  },
  {
    to: "/label",
    label: "Label",
    icon: Tag,
  },
  {
    to: "/profile",
    label: "Profile",
    icon: UserRound,
  },
] as const;

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="sticky bottom-0 flex w-full items-center justify-between gap-1 border-t border-border/70 bg-card px-3 py-3">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.end ? location.pathname === item.to : location.pathname.startsWith(item.to);

        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive: activeComputed }) => {
              const active = item.end ? activeComputed : activeComputed || isActive;

              return cn(
                "group relative inline-flex h-12 flex-1 items-center justify-center",
                "rounded-2xl px-2 transition-colors duration-200",
                active ? "bg-brand-soft/60 text-brand-deep" : "text-muted-foreground hover:text-brand-deep"
              );
            }}
          >
            {({ isActive: activeComputed }) => {
              const active = item.end ? activeComputed : activeComputed || isActive;

              return (
                <div className="flex flex-col items-center gap-1">
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border",
                      active
                        ? "border-brand-soft bg-brand-soft/70 text-brand-deep"
                        : "border-transparent bg-muted text-brand-deep/40 group-hover:border-brand-soft/70 group-hover:bg-brand-soft/40",
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2.1} />
                  </span>
                  <span
                    className={cn(
                      "text-[11px] font-semibold uppercase tracking-[0.18em]",
                      active ? "text-brand-deep" : "text-muted-foreground/80",
                    )}
                  >
                    {item.label}
                  </span>
                </div>
              );
            }}
          </NavLink>
        );
      })}
    </nav>
  );
};
