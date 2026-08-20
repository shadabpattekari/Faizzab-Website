export function StatusBadge({
  status,
  label,
}: {
  status: "available" | "coming_soon" | "in_development" | string;
  label: string;
}) {
  const tone =
    status === "available"
      ? "bg-[var(--accent-soft)] text-[var(--accent)]"
      : status === "coming_soon"
        ? "bg-[var(--blue-100)] text-[var(--blue-600)]"
        : "bg-[#f3eee3] text-[var(--warning)]";

  return (
    <span className={`inline-flex items-center rounded-[var(--radius-sm)] px-2.5 py-1 text-xs font-semibold ${tone}`}>
      {label}
    </span>
  );
}
