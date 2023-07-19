import NewActivity from "./NewActivity";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "ダッシュボード - ルーティンナさん | Routinena",
};

export default function NewActivityPage() {
  return <NewActivity />;
}
