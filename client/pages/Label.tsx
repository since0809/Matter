import { useMemo, useState } from "react";

import { labelCategories } from "@/features/matter/data/mockData";
import { TAG_OPTIONS } from "@/features/matter/dashboard/tag-options";
import { cn } from "@/lib/utils";

const LabelPage = () => {
  const [activeCategoryId, setActiveCategoryId] = useState(labelCategories[0].id);

  const activeCategory = useMemo(
    () => labelCategories.find((category) => category.id === activeCategoryId) ?? labelCategories[0],
    [activeCategoryId],
  );

  return (
    <div className="space-y-6">
      <section className="flex flex-col items-center justify-center rounded-3xl border border-border/70 bg-white/95 px-5 pb-5 pt-0 shadow-soft">
        <div className="mt-6 grid w-full max-w-2xl grid-cols-2 justify-items-center gap-4 sm:grid-cols-4 sm:gap-6">
          {TAG_OPTIONS.map((option) => {
            const active = option.id === activeCategoryId;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setActiveCategoryId(option.id)}
                className={cn(
                  "group flex h-20 w-20 items-center justify-center rounded-full border border-transparent bg-gradient-to-br transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                  option.tone,
                  active ? "border-brand shadow-brand" : "opacity-80 hover:opacity-100",
                )}
                aria-label={option.label}
              >
                <span
                  className={cn(
                    "flex h-16 w-16 items-center justify-center rounded-full bg-white/80 transition",
                    active ? "text-brand-deep" : "text-brand-deep/80 group-hover:text-brand-deep",
                  )}
                >
                  <option.icon className="h-7 w-7" strokeWidth={2.1} />
                </span>
                <span className="sr-only">{option.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-border/70 bg-white/95 p-5 shadow-soft">
        <header className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground/80">
            {activeCategory.name}
          </p>
          <h3 className="text-2xl font-semibold text-brand-deep">分類內容</h3>
          <p className="text-sm text-muted-foreground/80">{activeCategory.description}</p>
        </header>

        <div className="mt-5 space-y-3">
          {activeCategory.items.map((item, index) => (
            <div
              key={`${activeCategory.id}-${index}`}
              className="flex items-start gap-4 rounded-3xl border border-brand-soft/80 bg-brand-soft/20 px-4 py-4 text-brand-deep"
            >
              <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-deep text-sm font-bold text-white">
                {index + 1}
              </span>
              <div>
                <p className="text-base font-semibold">{item}</p>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-deep/70">
                  MATTER LABEL
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LabelPage;
