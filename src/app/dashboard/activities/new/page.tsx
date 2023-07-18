import NewActivity from "./NewActivity";
import { type Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export const metadata: Metadata = {
  title: "ダッシュボード - ルーティンナさん | Routinena",
};

export default async function NewActivityPage() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/login");
  }
  return <NewActivity />;
}
