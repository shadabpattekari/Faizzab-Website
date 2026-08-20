import { redirect } from "next/navigation";
import { ContentManager } from "@/components/admin/ContentManager";
import { getAdminSession } from "@/lib/auth/session";
import { insights } from "@/content/insights";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Admin Insights",
  description: "Manage insights",
  path: "/admin/insights",
  noIndex: true,
});

export default async function AdminInsightsPage() {
  const session = await getAdminSession();
  if (!session.isLoggedIn) redirect("/admin/login");

  return (
    <ContentManager
      title="Insights management"
      description="Create or override insights stored in MySQL. File-based defaults remain available if database content is empty."
      type="insights"
      csrfToken={session.csrfToken || ""}
      seedItems={insights.map((a) => ({
        slug: a.slug,
        status: a.status,
        title: a.title,
        payload: a as unknown as Record<string, unknown>,
      }))}
    />
  );
}
