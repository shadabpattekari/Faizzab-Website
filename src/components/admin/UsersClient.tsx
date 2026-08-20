"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: string;
  is_active: number;
  last_login_at: string | null;
  created_at: string;
}

export function UsersClient({ csrfToken }: { csrfToken: string }) {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function load() {
    const res = await fetch("/api/admin/users");
    const data = (await res.json()) as { ok?: boolean; users?: AdminUser[] };
    if (data.ok) setUsers(data.users || []);
  }

  useEffect(() => {
    void load();
  }, []);

  async function onCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setError("");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        csrfToken,
        email: fd.get("email"),
        name: fd.get("name"),
        role: fd.get("role"),
        password: fd.get("password"),
      }),
    });
    const data = (await res.json()) as { ok?: boolean; error?: string };
    if (!res.ok || !data.ok) {
      setError(data.error || "Unable to create user.");
      return;
    }
    setMessage("Admin user created.");
    e.currentTarget.reset();
    await load();
  }

  return (
    <div className="space-y-8">
      <div className="overflow-x-auto border border-[var(--border)] bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[var(--surface)] text-xs uppercase text-[var(--text-muted)]">
            <tr>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Role</th>
              <th className="px-3 py-2">Active</th>
              <th className="px-3 py-2">Last login</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-[var(--border)]">
                <td className="px-3 py-2">{user.name}</td>
                <td className="px-3 py-2">{user.email}</td>
                <td className="px-3 py-2">{user.role}</td>
                <td className="px-3 py-2">{user.is_active ? "Yes" : "No"}</td>
                <td className="px-3 py-2">
                  {user.last_login_at ? new Date(user.last_login_at).toLocaleString() : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form onSubmit={onCreate} className="max-w-xl space-y-3 border border-[var(--border)] bg-white p-5">
        <h2 className="font-semibold text-[var(--navy-900)]">Create admin user</h2>
        <input name="name" required placeholder="Name" className="w-full rounded border px-3 py-2 text-sm" />
        <input name="email" type="email" required placeholder="Email" className="w-full rounded border px-3 py-2 text-sm" />
        <select name="role" className="w-full rounded border px-3 py-2 text-sm" defaultValue="content_editor">
          <option value="content_editor">Content Editor</option>
          <option value="super_admin">Super Admin</option>
        </select>
        <input
          name="password"
          type="password"
          required
          placeholder="Strong password (12+ chars, mixed)"
          className="w-full rounded border px-3 py-2 text-sm"
        />
        {message ? <p className="text-sm text-[var(--accent)]">{message}</p> : null}
        {error ? <p className="text-sm text-[var(--danger)]">{error}</p> : null}
        <Button type="submit">Create user</Button>
      </form>
    </div>
  );
}
