import { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";

import { labelCategories } from "@/features/matter/data/mockData";
import { TAG_OPTIONS } from "@/features/matter/dashboard/tag-options";

const LabelPage = () => {
  const [activeCategoryId, setActiveCategoryId] = useState(labelCategories[0].id);

  const activeCategory = useMemo(
    () => labelCategories.find((category) => category.id === activeCategoryId) ?? labelCategories[0],
    [activeCategoryId],
  );

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-border/70 bg-white/95 p-5 shadow-soft">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground/80">
              Label directory
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-brand-deep">
              分類標籤總覽
            </h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground/80">
              依照事件、閱讀、地點等七大分類，快速找到屬於你的紀錄片段。
            </p>
          </div>
          <div className="inline-flex items-center gap-3 rounded-full border border-brand-soft/70 bg-brand-soft/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-deep">
            {labelCategories.length} Categories
          </div>
        </header>

        <div className="mt-6 grid gap-4 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="flex flex-wrap gap-3">
            {TAG_OPTIONS.filter((option) =>
              labelCategories.some((category) => category.id === option.id),
            ).map((option) => {
              const active = option.id === activeCategoryId;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setActiveCategoryId(option.id)}
                  className={`group inline-flex flex-1 min-w-[140px] items-center gap-3 rounded-3xl border bg-gradient-to-br px-4 py-3 text-left transition ${
                    option.tone
                  } ${active ? "shadow-brand" : "opacity-80 hover:opacity-100"}`}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-brand-deep">
                    <option.icon className="h-5 w-5" strokeWidth={2.1} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-brand-deep">
                      {labelCategories.find((category) => category.id === option.id)?.name}
                    </p>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-deep/70">
                      {option.label}
                    </p>
                  </div>
                  <ChevronRight className="ml-auto h-5 w-5 text-brand-deep/60" strokeWidth={2.1} />
                </button>
              );
            })}
          </div>
          <aside className="rounded-3xl border border-brand-soft/70 bg-brand-soft/30 px-4 py-5 text-xs text-brand-deep/80">
            <p className="font-semibold uppercase tracking-[0.35em] text-brand-deep">
              使用技巧
            </p>
            <ul className="mt-3 space-y-2">
              <li>透過標籤快速整理事件，方便在 Calendar 中追蹤。</li>
              <li>在 Note 加入照片，標籤也會保留影像記錄。</li>
              <li>搭配 Inspire 收藏列表，建立專屬靈感庫。</li>
            </ul>
          </aside>
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
