import Activity from "./Activity";
import { type Metadata } from "next";
import { getServerAuthSession } from "~/server/auth";
import { activitiesService } from "~/server/services/activities";

export const metadata: Metadata = {
  title: "活動 - ルーティンナさん | Routinena",
};

export default async function ActivityPage({ params }: { params: { activityId: string } }) {
  const session = await getServerAuthSession();
  if (!session?.user) return null;
  const activity = await activitiesService().getOne(session.user.id, { activityId: params.activityId });
  if (!activity) return null;

  return <Activity activity={activity} />;
}
