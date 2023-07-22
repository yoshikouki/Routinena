"use client";

import ActivityListItem from "./ActivityListItem";
import { useActivities } from "~/hooks/activities";

export default function ActivityList() {
  const { activities } = useActivities();

  return (
    <>
      {activities.map((activity) => (
        <ActivityListItem key={activity.id} activity={activity} />
      ))}
    </>
  );
}
