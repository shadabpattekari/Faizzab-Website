import { redirect } from "next/navigation";
import { ContentManager } from "@/components/admin/ContentManager";
import { getAdminSession } from "@/lib/auth/session";
import { resources } from "@/content/site";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Admin Resources",
  description: "Manage resources",
  path: "/admin/resources",
  noIndex: true,
});

export default async function AdminResourcesPage() {
  const session = await getAdminSession();
  if (!session.isLoggedIn) redirect("/admin/login");

  return (
    <ContentManager
      title="Resources management"
      description="Manage resource entries. Prefer structured fields over free-form HTML."
      type="resources"
      csrfToken={session.csrfToken || ""}
      seedItems={resources.map((r) => ({
        slug: r.slug,
        status: r.status,
        title: r.title,
        payload: r as unknown as Record<string, unknown>,
      }))}
    />
  );
}
