import AppLayout from "~/components/layouts/AppLayout";
import { useServerSession } from "~/hooks/server-session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await useServerSession.get();
  return <AppLayout session={session}>{children}</AppLayout>;
}
