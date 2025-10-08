import { addDays, parseISO } from "date-fns";

export type CalendarEntry = {
  date: string;
  entries: string[];
};

export const calendarEntries: CalendarEntry[] = [
  {
    date: "2025-09-10",
    entries: [
      "完成 10 月產品里程碑規劃",
      "與研究團隊同步使用者訪談成果",
    ],
  },
  {
    date: "2025-09-11",
    entries: [],
  },
  {
    date: "2025-09-12",
    entries: [
      "同步 10.2 版本 QA 狀況",
      "整理 Inspire 文章稿件",
      "傍晚冥想與感恩練習",
    ],
  },
  {
    date: "2025-09-13",
    entries: ["社群貼文排程設定"],
  },
  {
    date: "2025-09-16",
    entries: ["與設計師進行無障礙檢測"],
  },
];

export const getEntryStatus = (isoDate: string) => {
  const entry = calendarEntries.find((item) => item.date === isoDate);
  if (!entry) {
    return "none" as const;
  }
  if (entry.entries.length === 0) {
    return "empty" as const;
  }
  return "filled" as const;
};

export const getEntriesForDate = (isoDate: string) => {
  const entry = calendarEntries.find((item) => item.date === isoDate);
  return entry?.entries ?? [];
};

export type InspireArticle = {
  id: string;
  title: string;
  description: string;
  image: string;
  source: string;
  views: number;
  updatedAt: string;
  favorited: boolean;
};

export const inspireArticles: InspireArticle[] = [
  {
    id: "ai-video",
    title: "11 excellent examples of artificial intelligence in marketing",
    description:
      "從行銷案例中找到靈感，並運用至產品體驗設計，打造更貼近使用者的互動。",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
    source: "Matter Insight",
    views: 3289,
    updatedAt: "2025-09-11",
    favorited: true,
  },
  {
    id: "storytelling",
    title: "How to make engaging TikTok content to promote your brand",
    description:
      "掌握短影音的節奏與故事結構，讓內容在 7 秒內抓住觀眾的注意力。",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    source: "Creator Lab",
    views: 1876,
    updatedAt: "2025-09-09",
    favorited: false,
  },
  {
    id: "creative-block",
    title: "Unlocking creative blocks with mindful routines",
    description:
      "透過日常練習與反思，培養長期的創造力，支撐靈感長期輸出。",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
    source: "Mindful Studio",
    views: 1422,
    updatedAt: "2025-09-06",
    favorited: false,
  },
];

export type LabelCategory = {
  id: string;
  name: string;
  description: string;
  tone: string;
  items: string[];
};

export const labelCategories: LabelCategory[] = [
  {
    id: "event",
    name: "事件 Event",
    description: "緊湊的時間表，幫你快速回顧今天完成了哪些成果。",
    tone: "from-brand-soft/80 to-brand-soft",
    items: [
      "產品 10.2 更新會議",
      "社群合作提案討論",
      "晚上與 Mentor 進行回饋交流",
    ],
  },
  {
    id: "reading",
    name: "閱讀 Reading",
    description: "收藏正在吸收的新知，用閱讀拓展靈感邊界。",
    tone: "from-blue-200/80 to-blue-300/90",
    items: [
      "閱讀《使用者體驗研究實戰》",
      "完成 TEDx 心智圖筆記",
    ],
  },
  {
    id: "place",
    name: "地點 Place",
    description: "記錄讓你產生連結的位置，建立感動的地圖。",
    tone: "from-purple-200/80 to-purple-300/90",
    items: ["Matter Studio 共創空間", "河濱公園落日散步"],
  },
  {
    id: "idea",
    name: "想法 Idea",
    description: "捕捉靈光乍現的瞬間，隨時轉化為下一個專案靈感。",
    tone: "from-amber-200/80 to-amber-300/90",
    items: [
      "用 AI 協助整理每日重點",
      "設計標籤的顏色語言",
    ],
  },
];

export const profileStats = {
  days: 128,
  records: 412,
  inspirations: 68,
  startedAt: parseISO("2025-06-07"),
};

export const forecastNextHighlightDate = () => {
  const baseDate = profileStats.startedAt;
  return addDays(baseDate, profileStats.records % 7 + 5);
};
