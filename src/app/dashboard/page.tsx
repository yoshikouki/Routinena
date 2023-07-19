import { type Metadata } from "next";
import Dashboard from "./Dashboard";

export const metadata: Metadata = {
  title: "ダッシュボード - ルーティンナさん | Routinena",
};
export default function DashboardPage() {
  return <Dashboard />;
}
