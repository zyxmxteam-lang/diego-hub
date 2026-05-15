export interface Source {
  title: string;
  url: string;
}

export interface Research {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: CategoryKey;
  date: string;
  tags: string[];
  status: "completed" | "in-progress";
  sources?: Source[];
}

export type CategoryKey =
  | "marketing"
  | "ai-claude"
  | "technology"
  | "business"
  | "general";

export interface Category {
  label: string;
  color: string;
  bg: string;
  icon: string;
}

export const CATEGORIES: Record<CategoryKey, Category> = {
  marketing: {
    label: "Marketing & Copy",
    color: "#6366F1",
    bg: "rgba(99,102,241,0.12)",
    icon: "📣",
  },
  "ai-claude": {
    label: "AI & Claude",
    color: "#A855F7",
    bg: "rgba(168,85,247,0.12)",
    icon: "🤖",
  },
  technology: {
    label: "Tecnología",
    color: "#0EA5E9",
    bg: "rgba(14,165,233,0.12)",
    icon: "⚡",
  },
  business: {
    label: "Negocios",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.12)",
    icon: "💼",
  },
  general: {
    label: "General",
    color: "#64748B",
    bg: "rgba(100,116,139,0.12)",
    icon: "📌",
  },
};
