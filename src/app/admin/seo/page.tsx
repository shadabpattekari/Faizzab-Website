import { redirect } from "next/navigation";
import AdminSeoPageClient from "./SeoClient";
import { getAdminSession } from "@/lib/auth/session";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Admin SEO",
  description: "SEO overrides",
  path: "/admin/seo",
  noIndex: true,
});

export default async function AdminSeoPage() {
  const session = await getAdminSession();
  if (!session.isLoggedIn) redirect("/admin/login");
  return <AdminSeoPageClient csrfToken={session.csrfToken || ""} />;
}
