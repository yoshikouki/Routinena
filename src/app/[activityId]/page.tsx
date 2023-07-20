import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "活動 - ルーティンナさん | Routinena",
};

export default function ActivityPage({ params }: { params: { activityId: string } }) {
  return <>{params.activityId}</>;
}
