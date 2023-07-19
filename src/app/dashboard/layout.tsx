import { type Metadata } from "next";
import AppLayout from "../../components/layouts/AppLayout";

export const metadata: Metadata = {
  title: "ダッシュボード - ルーティンナさん | Routinena",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}
