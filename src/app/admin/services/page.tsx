import { redirect } from "next/navigation";
import { ContentManager } from "@/components/admin/ContentManager";
import { getAdminSession } from "@/lib/auth/session";
import { services } from "@/content/services";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Admin Services",
  description: "Manage service content overrides",
  path: "/admin/services",
  noIndex: true,
});

export default async function AdminServicesPage() {
  const session = await getAdminSession();
  if (!session.isLoggedIn) redirect("/admin/login");

  return (
    <ContentManager
      title="Service content management"
      description="Override selected service description fields. File defaults remain the baseline for fields you do not change."
      type="services"
      csrfToken={session.csrfToken || ""}
      seedItems={services.map((s) => ({
        slug: s.slug,
        status: "published",
        title: s.shortTitle,
        payload: s as unknown as Record<string, unknown>,
      }))}
    />
  );
}
