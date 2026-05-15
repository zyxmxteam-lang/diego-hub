import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ArrowRight } from "lucide-react";
import type { Research } from "@/lib/types";
import CategoryBadge from "./CategoryBadge";
import StatusDot from "./StatusDot";

interface Props {
  research: Research;
}

export default function ResearchCard({ research }: Props) {
  return (
    <Link href={`/research/${research.id}`} className="group block">
      <article
        className="h-full rounded-xl border border-[#1f1f1f] bg-[#111111] p-5
        transition-all duration-200 ease-out
        hover:border-[#2e2e2e] hover:bg-[#141414] hover:shadow-lg hover:shadow-black/40
        hover:-translate-y-0.5"
      >
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <CategoryBadge category={research.category} />
          <StatusDot status={research.status} />
        </div>

        {/* Title */}
        <h2 className="text-[15px] font-semibold text-[#f0f0f0] leading-snug mb-2 group-hover:text-white transition-colors">
          {research.title}
        </h2>

        {/* Summary */}
        <p className="text-[13px] text-[#666] leading-relaxed mb-4 line-clamp-3">
          {research.summary}
        </p>

        {/* Tags */}
        {research.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {research.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded-md bg-[#1a1a1a] text-[#555] border border-[#222]"
              >
                {tag}
              </span>
            ))}
            {research.tags.length > 3 && (
              <span className="text-[11px] px-2 py-0.5 rounded-md text-[#444]">
                +{research.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <time className="text-[12px] text-[#444]">
            {format(new Date(research.date), "d MMM yyyy", { locale: es })}
          </time>
          <span className="flex items-center gap-1 text-[12px] text-[#444] group-hover:text-[#6366f1] transition-colors">
            Leer
            <ArrowRight
              size={12}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </span>
        </div>
      </article>
    </Link>
  );
}
