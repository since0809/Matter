import type { LucideIcon } from "lucide-react";
import {
  BookOpenCheck,
  CalendarClock,
  Lightbulb,
  MapPin,
  PartyPopper,
  PlayCircle,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";

export type TagOption = {
  id:
    | "event"
    | "reading"
    | "place"
    | "media"
    | "dining"
    | "interest"
    | "idea"
    | "spark";
  label: string;
  icon: LucideIcon;
  tone: string;
};

export const TAG_OPTIONS: TagOption[] = [
  {
    id: "event",
    label: "Event",
    icon: CalendarClock,
    tone: "from-brand-soft/80 to-brand-soft",
  },
  {
    id: "reading",
    label: "Reading",
    icon: BookOpenCheck,
    tone: "from-brand-sun/40 to-brand-sun/70",
  },
  {
    id: "place",
    label: "Place",
    icon: MapPin,
    tone: "from-blue-200/80 to-blue-300/90",
  },
  {
    id: "media",
    label: "Media",
    icon: PlayCircle,
    tone: "from-rose-200/90 to-rose-300/80",
  },
  {
    id: "dining",
    label: "Dining",
    icon: UtensilsCrossed,
    tone: "from-amber-200/80 to-amber-300/90",
  },
  {
    id: "interest",
    label: "Interest",
    icon: PartyPopper,
    tone: "from-purple-200/80 to-purple-300/80",
  },
  {
    id: "idea",
    label: "Idea",
    icon: Lightbulb,
    tone: "from-lime-200/80 to-lime-300/90",
  },
  {
    id: "spark",
    label: "Spark",
    icon: Sparkles,
    tone: "from-sky-200/80 to-sky-300/80",
  },
];
