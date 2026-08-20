import { redirect } from "next/navigation";
import { ContentManager } from "@/components/admin/ContentManager";
import { getAdminSession } from "@/lib/auth/session";
import { faqs } from "@/content/site";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Admin FAQs",
  description: "Manage FAQs",
  path: "/admin/faqs",
  noIndex: true,
});

export default async function AdminFaqsPage() {
  const session = await getAdminSession();
  if (!session.isLoggedIn) redirect("/admin/login");

  return (
    <ContentManager
      title="FAQ management"
      description="Edit frequently asked questions shown on supporting pages and future FAQ modules."
      type="faqs"
      csrfToken={session.csrfToken || ""}
      seedItems={faqs.map((f) => ({
        slug: f.id,
        status: f.status,
        title: f.question,
        payload: f as unknown as Record<string, unknown>,
      }))}
    />
  );
}
