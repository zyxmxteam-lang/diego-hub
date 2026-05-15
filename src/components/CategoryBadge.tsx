"use client";

import { CATEGORIES, type CategoryKey } from "@/lib/types";

interface Props {
  category: CategoryKey;
  size?: "sm" | "md";
}

export default function CategoryBadge({ category, size = "md" }: Props) {
  const cat = CATEGORIES[category];
  const padding = size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${padding}`}
      style={{ color: cat.color, backgroundColor: cat.bg }}
    >
      <span>{cat.icon}</span>
      {cat.label}
    </span>
  );
}
