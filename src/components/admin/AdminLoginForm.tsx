"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(fd.get("email") || ""),
          password: String(fd.get("password") || ""),
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || "Invalid credentials.");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Unable to sign in.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md border border-[var(--border)] bg-white p-8 shadow-[var(--shadow-soft)]">
        <h1 className="font-[family-name:var(--font-display)] text-2xl text-[var(--navy-900)]">
          Admin sign in
        </h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Restricted access. There is no public registration.
        </p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              className="w-full rounded border border-[var(--border-strong)] px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-semibold">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded border border-[var(--border-strong)] px-3 py-2.5 text-sm"
            />
          </div>
          {error ? (
            <p className="text-sm text-[var(--danger)]" role="alert">
              {error}
            </p>
          ) : null}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
