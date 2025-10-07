import { ChangeEvent, useId, useRef } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type NotePhoto = {
  id: string;
  url: string;
  name: string;
};

type NoteEditorProps = {
  note: string;
  photos: NotePhoto[];
  onNoteChange: (value: string) => void;
  onAddPhotos: (files: FileList) => void;
  onRemovePhoto: (id: string) => void;
};

export const NoteEditor = ({
  note,
  photos,
  onNoteChange,
  onAddPhotos,
  onRemovePhoto,
}: NoteEditorProps) => {
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onAddPhotos(event.target.files);
      event.target.value = "";
    }
  };

  return (
    <section className="mt-6 rounded-3xl border border-border/70 bg-brand-primary-soft/40 p-4">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-brand-deep">Note</h2>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-full bg-brand-deep px-4 py-2 text-sm font-semibold text-white shadow-brand transition hover:brightness-110"
        >
          <ImagePlus className="h-4 w-4" strokeWidth={2.1} />
          Add photo
        </button>
      </header>

      <label className="sr-only" htmlFor={inputId}>
        Add photos to note
      </label>
      <input
        ref={fileInputRef}
        id={inputId}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      <textarea
        value={note}
        onChange={(event) => onNoteChange(event.target.value)}
        placeholder="補充紀錄或心得..."
        rows={4}
        className="mt-4 w-full resize-none rounded-3xl border border-brand-soft bg-white/90 px-4 py-3 text-base font-medium text-brand-deep shadow-inner outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
      />

      {photos.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          {photos.map((photo) => (
            <figure
              key={photo.id}
              className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft"
            >
              <img
                src={photo.url}
                alt={photo.name}
                className="h-32 w-full object-cover"
              />
              <figcaption className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-deep/80">
                {photo.name}
              </figcaption>
              <button
                type="button"
                onClick={() => onRemovePhoto(photo.id)}
                className={cn(
                  "absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition",
                  "opacity-0 group-hover:opacity-100",
                )}
                aria-label={`Remove photo ${photo.name}`}
              >
                <Trash2 className="h-4 w-4" strokeWidth={2} />
              </button>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
};
