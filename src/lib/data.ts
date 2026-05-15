import researchData from "../../data/research.json";
import type { Research, CategoryKey } from "./types";
import { CATEGORIES } from "./types";

export function getAllResearch(): Research[] {
  return (researchData as Research[]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getResearchById(id: string): Research | undefined {
  return (researchData as Research[]).find((r) => r.id === id);
}

export function getResearchByCategory(category: CategoryKey): Research[] {
  return getAllResearch().filter((r) => r.category === category);
}

export function getStats() {
  const all = getAllResearch();
  const now = new Date();
  const thisMonth = all.filter((r) => {
    const d = new Date(r.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });

  const byCategory = Object.keys(CATEGORIES).reduce(
    (acc, key) => {
      acc[key as CategoryKey] = all.filter((r) => r.category === key).length;
      return acc;
    },
    {} as Record<CategoryKey, number>
  );

  return {
    total: all.length,
    thisMonth: thisMonth.length,
    byCategory,
    inProgress: all.filter((r) => r.status === "in-progress").length,
  };
}
