import { type Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import AppLayout from "../../components/layouts/AppLayout";

export const metadata: Metadata = {
  title: "ダッシュボード - ルーティンナさん | Routinena",
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/login");
  }

  return <AppLayout>{children}</AppLayout>;
}
