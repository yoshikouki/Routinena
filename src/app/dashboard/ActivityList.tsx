"use client";

import ActivityListItem from "./ActivityListItem";
import { Typography } from "@mui/material";
import { useActivities } from "~/hooks/activities";

export default function ActivityList() {
  const { activities } = useActivities();

  return (
    <>
      {activities.length === 0 && (
        <Typography variant="body1">予定を作成しましょう</Typography>
      )}
      {activities.map((activity) => (
        <ActivityListItem key={activity.id} activity={activity} />
      ))}
    </>
  );
}
