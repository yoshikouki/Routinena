"use client";

import { Typography } from "@mui/material";

import Overlap from "~/components/Overlap";
import { useActivities } from "~/hooks/activities";
import Activity from "./Activity";
import ActivityListItem from "./ActivityListItem";

export default function ActivityList() {
  const { activities, currentActivity } = useActivities();

  return (
    <>
      {activities.length === 0 && (
        <Typography variant="body1">予定を作成しましょう</Typography>
      )}
      {activities.map((activity) => (
        <ActivityListItem key={activity.id} activity={activity} />
      ))}

      {currentActivity && (
        <Overlap open={!!currentActivity}>
          <Activity key={currentActivity.id} activity={currentActivity} />
        </Overlap>
      )}
    </>
  );
}
