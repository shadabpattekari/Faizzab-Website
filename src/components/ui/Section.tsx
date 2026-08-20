export function Section({
  children,
  className = "",
  id,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "muted" | "navy";
}) {
  const toneClass =
    tone === "muted"
      ? "bg-[var(--surface)]"
      : tone === "navy"
        ? "bg-[var(--navy-900)] text-[var(--text-inverse)]"
        : "bg-[var(--surface-elevated)]";

  return (
    <section id={id} className={`py-16 md:py-20 ${toneClass} ${className}`}>
      <div className="container-site">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverse = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverse?: boolean;
}) {
  return (
    <div className={`mb-10 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <p
          className={`mb-3 text-xs font-semibold uppercase tracking-[0.14em] ${
            inverse ? "text-[var(--blue-100)]" : "text-[var(--blue-600)]"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-[family-name:var(--font-display)] text-3xl leading-tight md:text-4xl ${
          inverse ? "text-white" : "text-[var(--navy-900)]"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-base md:text-lg ${inverse ? "text-white/80" : "text-[var(--text-muted)]"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
