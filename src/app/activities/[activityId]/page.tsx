import Activity from "./Activity";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "活動 - ルーティンナさん | Routinena",
};

export default function NewActivityPage({ params }: { params: { activityId: string } }) {
  return <Activity activityId={params.activityId} />;
}
