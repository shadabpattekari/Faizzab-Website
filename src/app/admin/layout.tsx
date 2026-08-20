import { AdminNav } from "@/components/admin/AdminNav";
import { getAdminSession } from "@/lib/auth/session";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Admin",
  description: "FaizZab website administration",
  path: "/admin",
  noIndex: true,
});

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();
  return (
    <div className="min-h-screen bg-[#eef1f6] text-[var(--text)]">
      {session.isLoggedIn ? (
        <div className="flex min-h-screen flex-col md:flex-row">
          <AdminNav
            name={session.name || "Admin"}
            role={session.role || "content_editor"}
            csrfToken={session.csrfToken || ""}
          />
          <div className="flex-1 p-4 md:p-8">{children}</div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
