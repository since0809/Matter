import { useEffect, useMemo, useState } from "react";
import { addDays, format, subDays } from "date-fns";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { NoteEditor, NotePhoto } from "@/features/matter/dashboard/NoteEditor";
import { PlannerTask, TaskItem } from "@/features/matter/dashboard/TaskItem";
import { TagSelector } from "@/features/matter/dashboard/TagSelector";
import { TAG_OPTIONS } from "@/features/matter/dashboard/tag-options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const fallbackTasks: PlannerTask[] = [
  {
    id: 1,
    text: "與設計團隊對齊 10.2 更新內容",
    tagId: "event",
  },
  {
    id: 2,
    text: "撰寫 Inspire 文章草稿",
    tagId: "idea",
  },
  {
    id: 3,
    text: "閱讀《AI 時代的專注力》",
    tagId: "reading",
  },
];

const makeId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `id-${Math.random().toString(36).slice(2, 10)}`;

const Index = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<PlannerTask[]>(fallbackTasks);
  const [note, setNote] = useState(
    "記錄讓你有所收穫的一天，或貼上一張激勵自己的照片。",
  );
  const [photos, setPhotos] = useState<NotePhoto[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTag, setActiveTag] = useState<string>(fallbackTasks[0].tagId);

  useEffect(() => {
    return () => {
      photos.forEach((photo) => URL.revokeObjectURL(photo.url));
    };
  }, [photos]);

  const dayNumber = format(selectedDate, "dd");
  const monthNumber = format(selectedDate, "MM");
  const weekday = format(selectedDate, "EEEE");

  const activeTagLabel = useMemo(() => {
    const option = TAG_OPTIONS.find((tag) => tag.id === activeTag);
    return option?.label ?? "Event";
  }, [activeTag]);

  const handleTaskChange = (id: number, updates: Partial<PlannerTask>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task)),
    );
  };

  const handleTagSelect = (id: string) => {
    setActiveTag(id);
    const targetTask =
      tasks.find((task) => !task.text.trim()) ?? tasks.at(-1) ?? tasks[0];

    if (targetTask) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === targetTask.id ? { ...task, tagId: id } : task,
        ),
      );
      toast.success(`已為「${targetTask.text || "新的任務"}」套用 ${
        TAG_OPTIONS.find((option) => option.id === id)?.label ?? "標籤"
      } 標籤`);
    }
  };

  const handleAddPhotos = (fileList: FileList) => {
    const nextPhotos = Array.from(fileList).map((file) => ({
      id: makeId(),
      url: URL.createObjectURL(file),
      name: file.name || "photo",
    }));

    setPhotos((prev) => {
      const updated = [...prev, ...nextPhotos].slice(0, 6);
      return updated;
    });
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos((prev) => {
      const target = prev.find((photo) => photo.id === id);
      if (target) {
        URL.revokeObjectURL(target.url);
      }
      return prev.filter((photo) => photo.id !== id);
    });
  };

  const addNewTask = () => {
    if (tasks.length >= 5) {
      toast("已達今日任務上限");
      return;
    }

    const newTask: PlannerTask = {
      id: Date.now(),
      text: "",
      tagId: activeTag,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const goToPreviousDay = () => {
    setSelectedDate((current) => subDays(current, 1));
  };

  const goToNextDay = () => {
    setSelectedDate((current) => addDays(current, 1));
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-border/70 bg-white/90 p-5 shadow-soft">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={goToPreviousDay}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-soft/70 bg-brand-soft/40 text-brand-deep transition hover:bg-brand-soft"
              aria-label="前一天"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2.1} />
            </button>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground/80">
                Today
              </p>
              <div className="flex items-baseline gap-3">
                <div className="flex items-baseline gap-1 text-brand-deep">
                  <span className="text-4xl font-bold tracking-[0.2em]">{monthNumber}</span>
                  <span className="text-lg font-semibold tracking-[0.3em]">/</span>
                  <span className="text-4xl font-bold tracking-[0.2em]">{dayNumber}</span>
                </div>
                <span className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground/80">
                  {weekday}
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            className="h-10 rounded-full border border-brand-soft/80 bg-brand-soft/30 px-4 text-sm font-semibold tracking-[0.2em] text-brand-deep hover:bg-brand-soft"
            onClick={goToNextDay}
            aria-label="下一天"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.1} />
          </Button>
        </header>

        <div className="mt-6 space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground/70">
              Focus label · {activeTagLabel}
            </p>
            <div className="mt-3">
              <TagSelector selected={activeTag} onSelect={handleTagSelect} />
            </div>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onChange={(updates) => handleTaskChange(task.id, updates)}
              />
            ))}
            <Button
              type="button"
              variant="ghost"
              onClick={addNewTask}
              className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-brand-soft/80 bg-brand-soft/20 py-3 text-sm font-semibold text-brand-deep hover:bg-brand-soft/40"
            >
              <Plus className="h-4 w-4" strokeWidth={2.2} />
              新增今天的任務
            </Button>
          </div>
        </div>
      </section>

      <NoteEditor
        note={note}
        photos={photos}
        onNoteChange={setNote}
        onAddPhotos={handleAddPhotos}
        onRemovePhoto={handleRemovePhoto}
      />

      <section className="rounded-3xl border border-border/60 bg-white/80 p-5 text-xs text-muted-foreground/80">
        <p>
          Matter — 記錄每天重要的三件事。透過標籤、筆記與照片，累積專屬於你的成就感。
        </p>
        <p className="mt-2">
          需要更多靈感嗎？探索 Inspire 區或替任務加上貼近生活的分類標籤。
        </p>
        <p className="mt-2 font-semibold text-brand-deep/70">
          Hey {user?.name ?? "Guest"}, keep collecting your highlights.
        </p>
      </section>
    </div>
  );
};

export default Index;
