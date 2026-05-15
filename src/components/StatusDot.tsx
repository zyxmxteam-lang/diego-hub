export default function StatusDot({ status }: { status: string }) {
  const isComplete = status === "completed";
  return (
    <span className="inline-flex items-center gap-1.5 text-xs">
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isComplete ? "bg-emerald-400" : "bg-amber-400 animate-pulse"
        }`}
      />
      <span className="text-[#555]">
        {isComplete ? "Completado" : "En progreso"}
      </span>
    </span>
  );
}
