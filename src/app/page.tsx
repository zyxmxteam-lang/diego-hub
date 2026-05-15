"use client";

import { useState, useMemo } from "react";
import { Search, Zap, TrendingUp, Clock, LayoutGrid } from "lucide-react";
import { getAllResearch, getStats } from "@/lib/data";
import { CATEGORIES, type CategoryKey } from "@/lib/types";
import ResearchCard from "@/components/ResearchCard";
import CategoryBadge from "@/components/CategoryBadge";

const ALL = "all";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey | "all">(ALL);
  const [query, setQuery] = useState("");

  const allResearch = useMemo(() => getAllResearch(), []);
  const stats = useMemo(() => getStats(), []);

  const filtered = useMemo(() => {
    return allResearch.filter((r) => {
      const matchCat = activeCategory === ALL || r.category === activeCategory;
      const matchQuery =
        !query ||
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.summary.toLowerCase().includes(query.toLowerCase()) ||
        r.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      return matchCat && matchQuery;
    });
  }, [allResearch, activeCategory, query]);

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#141414] bg-[#080808]/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-[#6366f1] flex items-center justify-center">
              <Zap size={14} className="text-white" />
            </div>
            <span className="text-[15px] font-semibold text-white tracking-tight">
              Diego Hub
            </span>
          </div>

          {/* Search */}
          <div className="relative max-w-xs w-full">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444]"
            />
            <input
              type="text"
              placeholder="Buscar investigaciones..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-8 pl-8 pr-3 rounded-lg bg-[#141414] border border-[#1f1f1f]
                text-[13px] text-[#ddd] placeholder-[#444]
                focus:outline-none focus:border-[#6366f1]/50 focus:bg-[#161616]
                transition-all duration-150"
            />
          </div>

          {/* Right: minimal label */}
          <div className="shrink-0 hidden sm:flex items-center gap-1.5 text-[12px] text-[#444]">
            <LayoutGrid size={13} />
            <span>{stats.total} investigaciones</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <StatCard
            icon={<LayoutGrid size={16} className="text-[#6366f1]" />}
            label="Total"
            value={stats.total}
          />
          <StatCard
            icon={<TrendingUp size={16} className="text-emerald-400" />}
            label="Este mes"
            value={stats.thisMonth}
          />
          <StatCard
            icon={<Clock size={16} className="text-amber-400" />}
            label="En progreso"
            value={stats.inProgress}
          />
          <StatCard
            icon={<Zap size={16} className="text-sky-400" />}
            label="Categorías"
            value={Object.keys(CATEGORIES).length}
          />
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveCategory(ALL)}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-150 ${
              activeCategory === ALL
                ? "bg-[#6366f1] text-white"
                : "bg-[#141414] text-[#666] border border-[#1f1f1f] hover:border-[#2a2a2a] hover:text-[#999]"
            }`}
          >
            Todas
            <span className="ml-1.5 text-[11px] opacity-70">{allResearch.length}</span>
          </button>

          {(Object.keys(CATEGORIES) as CategoryKey[]).map((key) => {
            const count = stats.byCategory[key];
            if (!count) return null;
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`shrink-0 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-150 border ${
                  activeCategory === key
                    ? "border-transparent"
                    : "bg-[#141414] border-[#1f1f1f] hover:border-[#2a2a2a]"
                }`}
                style={
                  activeCategory === key
                    ? {
                        backgroundColor: CATEGORIES[key].bg,
                        color: CATEGORIES[key].color,
                        borderColor: CATEGORIES[key].color + "40",
                      }
                    : { color: "#666" }
                }
              >
                {CATEGORIES[key].icon} {CATEGORIES[key].label}
                <span className="ml-1.5 text-[11px] opacity-60">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Results count */}
        {query && (
          <p className="text-[13px] text-[#555] mb-4">
            {filtered.length} resultado{filtered.length !== 1 ? "s" : ""} para &ldquo;{query}&rdquo;
          </p>
        )}

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
            {filtered.map((r) => (
              <ResearchCard key={r.id} research={r} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-[15px] text-[#444]">Sin resultados</p>
            <p className="text-[13px] text-[#333] mt-1">
              Intenta con otra búsqueda o categoría
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#111] mt-16 py-6">
        <p className="text-center text-[12px] text-[#333]">
          Diego Hub · Actualizado con cada investigación
        </p>
      </footer>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#111] border border-[#1a1a1a]">
      <div className="shrink-0">{icon}</div>
      <div>
        <div className="text-[18px] font-semibold text-white leading-none">{value}</div>
        <div className="text-[11px] text-[#555] mt-0.5">{label}</div>
      </div>
    </div>
  );
}
