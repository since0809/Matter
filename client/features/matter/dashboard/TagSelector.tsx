import { cn } from "@/lib/utils";
import { TAG_OPTIONS } from "./tag-options";

type TagSelectorProps = {
  selected?: string;
  onSelect: (id: string) => void;
};

export const TagSelector = ({ selected, onSelect }: TagSelectorProps) => {
  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2">
      {TAG_OPTIONS.map((tag) => {
        const active = selected === tag.id;

        return (
          <button
            key={tag.id}
            type="button"
            onClick={() => onSelect(tag.id)}
            className={cn(
              "group inline-flex flex-col items-center gap-2 rounded-3xl border",
              "border-transparent px-3 py-2 text-center transition-all duration-200",
              active ? "bg-brand-soft/60 shadow-brand" : "hover:bg-muted",
            )}
          >
            <span
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br transition-all duration-200",
                tag.tone,
                active
                  ? "text-brand-deep shadow-md shadow-brand-soft/70"
                  : "text-muted-foreground/80 saturate-50 group-hover:saturate-100 group-hover:text-brand-deep",
              )}
            >
              <tag.icon className="h-5 w-5" strokeWidth={2.1} />
            </span>
            <span
              className={cn(
                "text-[11px] font-semibold uppercase tracking-[0.35em]",
                active ? "text-brand-deep" : "text-muted-foreground/70",
              )}
            >
              {tag.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
