import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost" | "inverse";

const styles: Record<Variant, string> = {
  primary:
    "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] border border-transparent",
  secondary:
    "bg-transparent text-[var(--navy-900)] border border-[var(--border-strong)] hover:border-[var(--navy-700)] hover:bg-white",
  ghost: "bg-transparent text-[var(--navy-900)] border border-transparent hover:bg-[var(--blue-100)]",
  inverse:
    "bg-white text-[var(--navy-900)] border border-white hover:bg-[var(--blue-100)]",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-[var(--radius-md)] px-5 py-2.5 text-sm font-semibold no-underline transition-colors ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-[var(--radius-md)] px-5 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
