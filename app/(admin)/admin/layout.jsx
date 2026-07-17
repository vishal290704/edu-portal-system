import AdminLayout from "@/components/admin/layout/AdminLayout";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <AdminLayout user={user}>
      {children}
    </AdminLayout>
  );
}