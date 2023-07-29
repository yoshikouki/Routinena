"use client";

import ActivityListItem from "./ActivityListItem";
import { Typography } from "@mui/material";
import { api } from "~/utils/api";

export default function ActivityList() {
  const [activities] = api.activities.getAll.useSuspenseQuery();

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
