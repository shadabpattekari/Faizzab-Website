import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { getAdminSession } from "@/lib/auth/session";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Admin Login",
  description: "FaizZab administrator sign in",
  path: "/admin/login",
  noIndex: true,
});

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session.isLoggedIn) redirect("/admin");
  return <AdminLoginForm />;
}
