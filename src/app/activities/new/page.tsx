import NewActivity from "./NewActivity";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "活動の作成 - ルーティンナさん | Routinena",
};

export default function NewActivityPage() {
  return <NewActivity />;
}
