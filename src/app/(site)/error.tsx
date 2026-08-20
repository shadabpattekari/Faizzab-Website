"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="container-site flex min-h-[50vh] flex-col items-start justify-center py-20">
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--navy-900)]">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-xl text-[var(--text-muted)]">
        An unexpected error occurred while loading this page. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-[var(--radius-md)] bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white"
      >
        Try again
      </button>
    </section>
  );
}
