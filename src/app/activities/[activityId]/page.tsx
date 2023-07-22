import Activity from "./Activity";
import { type Metadata } from "next";
import { useServerActivities } from "~/hooks/server-activities";

export const metadata: Metadata = {
  title: "活動 - ルーティンナさん | Routinena",
};

export default async function ActivityPage({
  params,
}: {
  params: { activityId: string };
}) {
  const activity = await useServerActivities.getOne(params.activityId);

  return <Activity activity={activity} />;
}
