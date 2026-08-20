"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

interface SeedItem {
  slug: string;
  status: string;
  title: string;
  payload: Record<string, unknown>;
}

export function ContentManager({
  title,
  description,
  type,
  csrfToken,
  seedItems,
}: {
  title: string;
  description: string;
  type: "insights" | "resources" | "faqs" | "services" | "seo";
  csrfToken: string;
  seedItems: SeedItem[];
}) {
  const [items, setItems] = useState<SeedItem[]>(seedItems);
  const [selected, setSelected] = useState(seedItems[0]?.slug || "");
  const [jsonText, setJsonText] = useState(
    JSON.stringify(seedItems[0]?.payload || {}, null, 2),
  );
  const [status, setStatus] = useState(seedItems[0]?.status || "draft");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/admin/content?type=${type}`);
      const data = (await res.json()) as {
        ok?: boolean;
        items?: Array<{ slug: string; status: string; payload: Record<string, unknown> }>;
      };
      if (data.ok && data.items?.length) {
        const mapped = data.items.map((item) => ({
          slug: item.slug,
          status: item.status,
          title: String((item.payload as { title?: string }).title || item.slug),
          payload: item.payload,
        }));
        setItems(mapped);
        setSelected(mapped[0].slug);
        setJsonText(JSON.stringify(mapped[0].payload, null, 2));
        setStatus(mapped[0].status);
      }
    }
    void load();
  }, [type]);

  function onSelect(slug: string) {
    const item = items.find((i) => i.slug === slug);
    if (!item) return;
    setSelected(slug);
    setJsonText(JSON.stringify(item.payload, null, 2));
    setStatus(item.status);
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const payload = JSON.parse(jsonText) as Record<string, unknown>;
      // Strip executable HTML/JS fields that should not be free-form scripts
      if (typeof payload.bodyHtml === "string") delete payload.bodyHtml;
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          csrfToken,
          type,
          slug: selected,
          status,
          payload,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || "Unable to save.");
        return;
      }
      setMessage("Saved.");
    } catch {
      setError("Invalid JSON payload.");
    }
  }

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--navy-900)]">
        {title}
      </h1>
      <p className="mt-2 max-w-3xl text-sm text-[var(--text-muted)]">{description}</p>
      <div className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
        <div className="border border-[var(--border)] bg-white">
          <ul className="divide-y divide-[var(--border)]">
            {items.map((item) => (
              <li key={item.slug}>
                <button
                  type="button"
                  onClick={() => onSelect(item.slug)}
                  className={`block w-full px-3 py-3 text-left text-sm ${
                    selected === item.slug ? "bg-[var(--blue-100)] font-semibold" : ""
                  }`}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={onSave} className="border border-[var(--border)] bg-white p-4">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <label className="text-sm font-semibold">
              Status
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="ml-2 rounded border border-[var(--border-strong)] px-2 py-1 text-sm"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </label>
            <span className="text-xs text-[var(--text-muted)]">Slug: {selected}</span>
          </div>
          <label className="mb-1 block text-sm font-semibold">Structured JSON payload</label>
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            rows={22}
            className="w-full rounded border border-[var(--border-strong)] px-3 py-2 font-mono text-xs"
            spellCheck={false}
          />
          <p className="mt-2 text-xs text-[var(--text-muted)]">
            Do not paste executable HTML or JavaScript. Rich text fields are sanitised server-side.
          </p>
          {message ? <p className="mt-2 text-sm text-[var(--accent)]">{message}</p> : null}
          {error ? <p className="mt-2 text-sm text-[var(--danger)]">{error}</p> : null}
          <div className="mt-4">
            <Button type="submit">Save content</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
