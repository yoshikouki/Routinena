"use client";

import { Skeleton, styled } from "@mui/material";

import ActivityListItem from "./ActivityListItem";
import { useActivities } from "~/hooks/activities";

export const ActivityListSkeleton = styled(Skeleton)(({ theme }) => ({
  width: "100%",
  height: 200,
  borderRadius: theme.shape.borderRadius,
}));

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
