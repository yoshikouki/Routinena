"use client";

import { Container, Typography } from "@mui/material";

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
        <Container
          sx={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            position: "fixed",
            zIndex: 1000,
            bgcolor: "background.paper",
            maxWidth: "md",
            height: "100vh",
            overflow: "auto",
            pt: 12,
            pb: 12,
            gap: 4,
          }}
        >
          <Activity key={currentActivity.id} activity={currentActivity} />
        </Container>
      )}
    </>
  );
}
