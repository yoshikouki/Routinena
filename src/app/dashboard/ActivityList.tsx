"use client";

import { Box, Typography } from "@mui/material";

import { ActivityListItemSkeleton } from "~/components/ActivityListItemSkeleton";
import Overlap from "~/components/Overlap";
import { useActivities } from "~/hooks/activities";
import Activity from "./Activity";
import ActivityEditing from "./ActivityEditing";
import ActivityListItem from "./ActivityListItem";

export default function ActivityList() {
  const { activities, currentActivity, currentDisplayMode, isLoading } =
    useActivities();

  return (
    <>
      {isLoading && (
        <Box sx={{ px: 2 }}>
          <ActivityListItemSkeleton />
        </Box>
      )}
      {!isLoading && activities.length === 0 && (
        <Typography variant="body1" sx={{ px: 2 }}>
          予定を作成しましょう
        </Typography>
      )}
      {activities.map((activity) => (
        <ActivityListItem key={activity.id} activity={activity} />
      ))}

      {currentActivity && (
        <Overlap open={!!currentActivity}>
          {currentDisplayMode === "show" && (
            <Activity key={currentActivity.id} activity={currentActivity} />
          )}
          {currentDisplayMode === "edit" && (
            <ActivityEditing
              key={currentActivity.id}
              activity={currentActivity}
            />
          )}
        </Overlap>
      )}
    </>
  );
}
