import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { KeyStatus } from "./KeyStatus";
import { BottomNav } from "./BottomNav";

const viewCopy: Record<string, { title: string; caption: string }> = {
  "/": {
    title: "List",
    caption: "Capture the three things that truly matter today.",
  },
  "/calendar": {
    title: "Calendar",
    caption: "See your month at a glance and revisit key days.",
  },
  "/inspire": {
    title: "Inspire",
    caption: "Fresh inspirations curated for your personal growth.",
  },
  "/label": {
    title: "Label",
    caption: "Filter moments by label to focus on what you need.",
  },
  "/profile": {
    title: "Profile",
    caption: "Track your progress and celebrate milestones.",
  },
};

const getViewMeta = (pathname: string) => {
  const exactMatch = viewCopy[pathname];
  if (exactMatch) {
    return exactMatch;
  }

  const matchingKey = Object.keys(viewCopy).find((key) =>
    pathname.startsWith(key),
  );

  return matchingKey ? viewCopy[matchingKey] : viewCopy["/"];
};

export const MainLayout = () => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  const { title, caption } = useMemo(
    () => getViewMeta(location.pathname),
    [location.pathname],
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen w-full bg-transparent px-4 py-10 sm:py-16">
      <div className="mx-auto w-full max-w-md">
        <div className="relative flex w-full flex-col overflow-hidden rounded-[32px] border border-border/60 bg-card/95 shadow-soft backdrop-blur-xl">
          <div className="absolute -left-32 -top-20 h-56 w-56 rounded-full bg-brand-soft/60 blur-3xl" aria-hidden />
          <div className="absolute -right-24 -top-16 h-48 w-48 rounded-full bg-brand-sun/20 blur-3xl" aria-hidden />

          <header className="relative flex items-start justify-between px-6 pb-4 pt-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.42em] text-muted-foreground/70">
                Hey, {user?.name ?? "Guest"}
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-brand-deep">
                {title}
              </h1>
              <p className="mt-2 max-w-[230px] text-sm text-muted-foreground/90">
                {caption}
              </p>
            </div>
            <KeyStatus active pulse />
          </header>

          <main className={cn("relative flex-1 px-6 pb-28 pt-2")}
            aria-live="polite"
          >
            <Outlet />
          </main>

          <BottomNav />
        </div>
      </div>
    </div>
  );
};
