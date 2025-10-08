import { useState } from "react";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { TAG_OPTIONS } from "./tag-options";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type PlannerTask = {
  id: number;
  text: string;
  tagId: string;
};

type TaskItemProps = {
  task: PlannerTask;
  onChange: (updates: Partial<PlannerTask>) => void;
};

export const TaskItem = ({ task, onChange }: TaskItemProps) => {
  const [open, setOpen] = useState(false);
  const selectedTag = TAG_OPTIONS.find((option) => option.id === task.tagId);

  return (
    <div className="relative flex items-center gap-3 rounded-2xl border border-border/80 bg-card/80 px-3 py-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-2xl border bg-gradient-to-br transition-all",
              selectedTag?.tone ?? "from-muted to-muted",
              "border-transparent hover:border-brand-soft/70",
            )}
            aria-label={selectedTag ? `Change tag ${selectedTag.label}` : "Select tag"}
          >
            {selectedTag ? (
              <selectedTag.icon className="h-5 w-5 text-brand-deep" strokeWidth={2.1} />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground" strokeWidth={1.8} />
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent side="right" align="start" className="w-44 rounded-2xl border border-border/70 bg-card/95 p-2 shadow-lg">
          <div className="grid grid-cols-2 gap-2">
            {TAG_OPTIONS.map((option) => {
              const active = option.id === task.tagId;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    onChange({ tagId: option.id });
                    setOpen(false);
                  }}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-xl border border-transparent bg-gradient-to-br px-2 py-2 text-center text-xs font-semibold uppercase tracking-[0.18em] transition-all",
                    option.tone,
                    active
                      ? "text-brand-deep shadow-brand"
                      : "text-brand-deep/60 hover:border-brand-soft/60 hover:shadow-brand",
                  )}
                >
                  <option.icon className="h-5 w-5" strokeWidth={2.1} />
                  {option.label}
                </button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>

      <label className="flex-1">
        <span className="sr-only">Plan task text</span>
        <textarea
          value={task.text}
          onChange={(event) => onChange({ text: event.target.value })}
          placeholder="填寫今天的重要事件"
          rows={2}
          className="w-full resize-none border-none bg-transparent text-base font-semibold leading-tight text-brand-deep placeholder:text-muted-foreground/70 focus:outline-none focus:ring-0"
        />
      </label>

    </div>
  );
};
