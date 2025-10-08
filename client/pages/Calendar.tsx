import { useMemo, useState } from "react";
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getMonth,
  getYear,
  isSameDay,
  isSameMonth,
  parseISO,
  setMonth,
  setYear,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { CalendarDays, Sparkles } from "lucide-react";

import {
  calendarEntries,
  getEntriesForDate,
  getEntryStatus,
} from "@/features/matter/data/mockData";

const monthOptions = Array.from({ length: 12 }, (_, index) => ({
  value: index,
  label: format(new Date(2025, index, 1), "MMMM"),
}));

const yearOptions = [2024, 2025, 2026, 2027, 2028];

const statusStyles: Record<ReturnType<typeof getEntryStatus>, string> = {
  none: "bg-white text-muted-foreground border-border/60",
  empty: "bg-muted text-brand-deep/80 border-brand-soft/60",
  filled: "bg-brand-soft text-brand-deep border-brand-soft",
};

const CalendarPage = () => {
  const defaultFocus = useMemo(() => parseISO("2025-09-12"), []);
  const [focusedMonth, setFocusedMonth] = useState(defaultFocus);
  const [selectedDate, setSelectedDate] = useState(defaultFocus);

  const monthDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(focusedMonth), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(focusedMonth), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [focusedMonth]);

  const selectedDateEntries = useMemo(() => {
    const key = format(selectedDate, "yyyy-MM-dd");
    return getEntriesForDate(key);
  }, [selectedDate]);

  const onSelectDate = (day: Date) => {
    setSelectedDate(day);
    if (!isSameMonth(day, focusedMonth)) {
      setFocusedMonth(day);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-border/70 bg-white/90 p-5 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground/80">
              Calendar overview
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-brand-deep">
              當月紀錄一覽
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground/80">
              年分
              <select
                className="rounded-full border border-brand-soft/70 bg-brand-soft/20 px-3 py-2 text-xs font-semibold text-brand-deep shadow-none focus:outline-none focus:ring-2 focus:ring-brand/40"
                value={getYear(focusedMonth)}
                onChange={(event) =>
                  setFocusedMonth((prev) =>
                    setYear(prev, Number.parseInt(event.target.value, 10)),
                  )
                }
              >
                {yearOptions.map((yearOption) => (
                  <option key={yearOption} value={yearOption}>
                    {yearOption}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground/80">
              月份
              <select
                className="rounded-full border border-brand-soft/70 bg-brand-soft/20 px-3 py-2 text-xs font-semibold text-brand-deep shadow-none focus:outline-none focus:ring-2 focus:ring-brand/40"
                value={getMonth(focusedMonth)}
                onChange={(event) =>
                  setFocusedMonth((prev) =>
                    setMonth(prev, Number.parseInt(event.target.value, 10)),
                  )
                }
              >
                {monthOptions.map((monthOption) => (
                  <option key={monthOption.value} value={monthOption.value}>
                    {monthOption.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground/70">
          {"一二三四五六日".split("").map((weekday) => (
            <div key={weekday} className="rounded-2xl bg-muted/60 py-2">
              {weekday}
            </div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-7 gap-2">
          {monthDays.map((day) => {
            const key = format(day, "yyyy-MM-dd");
            const status = getEntryStatus(key);
            const isOutsideMonth = !isSameMonth(day, focusedMonth);
            const isToday = isSameDay(day, new Date());
            const isSelected = isSameDay(day, selectedDate);

            return (
              <button
                key={key}
                type="button"
                onClick={() => onSelectDate(day)}
                className={`relative flex aspect-square flex-col items-center justify-center rounded-2xl border text-sm font-semibold transition-all duration-200 ${
                  isSelected
                    ? "border-brand-deep bg-brand-deep text-white shadow-brand"
                    : isToday
                      ? "border-brand-deep/70 bg-brand-deep/10 text-brand-deep"
                      : statusStyles[status]
                } ${isOutsideMonth ? "opacity-50" : ""}`}
              >
                <span className="text-lg tracking-[0.1em]">
                  {format(day, "d")}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.4em]">
                  {format(day, "EE").slice(0, 2)}
                </span>
                {status === "filled" && !isSelected && !isToday && (
                  <span className="absolute bottom-2 h-1.5 w-1.5 rounded-full bg-brand-deep" />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap gap-3 text-xs font-medium text-muted-foreground/80">
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-white" />
            尚未填寫
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-brand-soft/80" />
            已紀錄事件
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-brand-deep" />
            選取日期 / 今日
          </span>
        </div>
      </section>

      <section className="rounded-3xl border border-border/60 bg-brand-soft/40 p-5">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground/80">
              {format(selectedDate, "yyyy / MM / dd EEEE")}
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-brand-deep">
              今日三件事
            </h3>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-soft/70 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-deep">
            <CalendarDays className="h-4 w-4" strokeWidth={2.1} />
            {selectedDateEntries.length > 0
              ? `${selectedDateEntries.length} Tasks`
              : "No Entry"}
          </div>
        </header>

        <div className="mt-4 space-y-3">
          {selectedDateEntries.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-brand-soft/80 bg-white/70 px-4 py-6 text-sm font-semibold text-brand-deep/70">
              這一天還沒有紀錄。點選上方日期或回到 List 來新增屬於你的 Highlight。
            </div>
          ) : (
            selectedDateEntries.map((entry, index) => (
              <div
                key={`${format(selectedDate, "yyyy-MM-dd")}-${index}`}
                className="flex items-start gap-4 rounded-2xl border border-brand-soft/70 bg-white/95 px-4 py-3 shadow-soft"
              >
                <div className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-soft text-sm font-bold text-brand-deep">
                  {index + 1}
                </div>
                <p className="text-base font-semibold text-brand-deep/90">
                  {entry}
                </p>
              </div>
            ))
          )}
        </div>

        <footer className="mt-5 flex items-center justify-between rounded-2xl bg-white/80 px-4 py-3 text-xs text-muted-foreground/70">
          <span>
            {calendarEntries.length} 天留下了紀錄，保持節奏就能看見改變。
          </span>
          <span className="inline-flex items-center gap-2 font-semibold text-brand-deep">
            <Sparkles className="h-4 w-4" strokeWidth={2.1} />
            收集今日的亮點
          </span>
        </footer>
      </section>
    </div>
  );
};

export default CalendarPage;
