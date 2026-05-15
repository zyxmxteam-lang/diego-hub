import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ArrowLeft, ExternalLink, Calendar, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getResearchById, getAllResearch } from "@/lib/data";
import CategoryBadge from "@/components/CategoryBadge";
import StatusDot from "@/components/StatusDot";
import ResearchCard from "@/components/ResearchCard";
import { CATEGORIES } from "@/lib/types";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const all = getAllResearch();
  return all.map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const research = getResearchById(id);
  if (!research) return {};
  return {
    title: `${research.title} — Diego Hub`,
    description: research.summary,
  };
}

export default async function ResearchPage({ params }: Props) {
  const { id } = await params;
  const research = getResearchById(id);
  if (!research) notFound();

  const related = getAllResearch()
    .filter((r) => r.category === research.category && r.id !== research.id)
    .slice(0, 3);

  const cat = CATEGORIES[research.category];

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Top bar */}
      <div className="sticky top-0 z-50 border-b border-[#141414] bg-[#080808]/90 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-[13px] text-[#555] hover:text-[#999] transition-colors"
          >
            <ArrowLeft size={14} />
            Volver
          </Link>
          <span className="text-[#1f1f1f]">/</span>
          <span className="text-[13px] text-[#444] truncate">{research.title}</span>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-6 py-10">
        {/* Header article */}
        <header className="mb-10">
          {/* Category + status */}
          <div className="flex items-center gap-3 mb-5">
            <CategoryBadge category={research.category} />
            <StatusDot status={research.status} />
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-4">
            {research.title}
          </h1>

          {/* Summary */}
          <p className="text-[15px] text-[#888] leading-relaxed mb-6">
            {research.summary}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-[#141414]">
            <div className="flex items-center gap-1.5 text-[13px] text-[#555]">
              <Calendar size={13} />
              <time>{format(new Date(research.date), "d 'de' MMMM yyyy", { locale: es })}</time>
            </div>

            {research.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Tag size={12} className="text-[#444]" />
                {research.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[12px] px-2 py-0.5 rounded-md bg-[#141414] text-[#555] border border-[#1f1f1f]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="prose max-w-none mb-12">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {research.content}
          </ReactMarkdown>
        </div>

        {/* Sources */}
        {research.sources && research.sources.length > 0 && (
          <section className="mb-12 p-5 rounded-xl bg-[#111] border border-[#1a1a1a]">
            <h3 className="text-[13px] font-semibold text-[#666] uppercase tracking-wider mb-3">
              Fuentes
            </h3>
            <ul className="space-y-2">
              {research.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[13px] text-[#6366f1] hover:text-[#818cf8] transition-colors"
                  >
                    <ExternalLink size={12} />
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Related */}
        {related.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-1 h-4 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              <h3 className="text-[13px] font-semibold text-[#555] uppercase tracking-wider">
                Más en {cat.label}
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {related.map((r) => (
                <ResearchCard key={r.id} research={r} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
