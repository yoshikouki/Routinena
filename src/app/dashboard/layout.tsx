import AppLayout from "~/components/layouts/AppLayout";
import { useServerSession } from "~/hooks/server-session";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await useServerSession.get();
  return <AppLayout session={session}>{children}</AppLayout>;
}
