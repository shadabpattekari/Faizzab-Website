"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

export default function AdminSeoPageClient({ csrfToken }: { csrfToken: string }) {
  const [pathKey, setPathKey] = useState("/");
  const [title, setTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [items, setItems] = useState<
    Array<{ path_key: string; title: string; meta_description: string }>
  >([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/content?type=seo");
      const data = (await res.json()) as {
        ok?: boolean;
        items?: Array<{ path_key: string; title: string; meta_description: string }>;
      };
      if (data.ok) setItems(data.items || []);
    }
    void load();
  }, []);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setError("");
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        csrfToken,
        type: "seo",
        slug: pathKey,
        title,
        metaDescription,
      }),
    });
    const data = (await res.json()) as { ok?: boolean; error?: string };
    if (!res.ok || !data.ok) {
      setError(data.error || "Unable to save.");
      return;
    }
    setMessage("SEO override saved.");
  }

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--navy-900)]">
        SEO title / meta overrides
      </h1>
      <p className="mt-2 text-sm text-[var(--text-muted)]">
        Optional overrides for page titles and meta descriptions. Public pages ship with strong
        defaults from code.
      </p>
      <form onSubmit={onSave} className="mt-6 max-w-2xl space-y-3 border border-[var(--border)] bg-white p-5">
        <input
          value={pathKey}
          onChange={(e) => setPathKey(e.target.value)}
          placeholder="Path key e.g. /about"
          className="w-full rounded border border-[var(--border-strong)] px-3 py-2 text-sm"
          required
        />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="SEO title"
          className="w-full rounded border border-[var(--border-strong)] px-3 py-2 text-sm"
          required
        />
        <textarea
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          placeholder="Meta description"
          rows={4}
          className="w-full rounded border border-[var(--border-strong)] px-3 py-2 text-sm"
          required
        />
        {message ? <p className="text-sm text-[var(--accent)]">{message}</p> : null}
        {error ? <p className="text-sm text-[var(--danger)]">{error}</p> : null}
        <Button type="submit">Save override</Button>
      </form>
      <div className="mt-8 overflow-x-auto border border-[var(--border)] bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[var(--surface)] text-xs uppercase text-[var(--text-muted)]">
            <tr>
              <th className="px-3 py-2">Path</th>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.path_key} className="border-t border-[var(--border)]">
                <td className="px-3 py-2">{item.path_key}</td>
                <td className="px-3 py-2">{item.title}</td>
                <td className="px-3 py-2">{item.meta_description}</td>
              </tr>
            ))}
            {!items.length ? (
              <tr>
                <td colSpan={3} className="px-3 py-6 text-center text-[var(--text-muted)]">
                  No overrides saved yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
