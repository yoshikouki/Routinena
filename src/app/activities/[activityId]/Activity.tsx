"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RelativeDate } from "~/components/RelativeDate";
import { useActivity } from "~/hooks/activities";
import { type ActivityWithCompletions } from "~/hooks/server-activities";
import ActivityEditing from "./ActivityEditing";

export default function Activity(props: { activity: ActivityWithCompletions }) {
  const { activity, setActivity, deleteActivity } = useActivity({
    activity: props.activity,
  });
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const onEditingSubmit = (updatedActivity: ActivityWithCompletions) => {
    setIsEditing(false);
    setActivity({
      ...activity,
      ...updatedActivity,
    });
  };
  const onDeletion = () => {
    deleteActivity();
    router.push("/dashboard");
  };

  return isEditing ? (
    <ActivityEditing
      activity={activity}
      onSubmit={onEditingSubmit}
      onCancel={() => setIsEditing(false)}
    />
  ) : (
    <>
      <Box>
        <Typography variant="h1">{activity.name}</Typography>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="body1">{activity.description}</Typography>
      </Box>

      <Box sx={{ mt: 6 }}>
        <Button
          onClick={() => setIsEditing(true)}
          color="primary"
          variant="outlined"
          fullWidth
        >
          編集
        </Button>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Button
          onClick={onDeletion}
          color="warning"
          variant="outlined"
          fullWidth
        >
          削除
        </Button>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h2">実績</Typography>

        {activity.completions.length === 0 && (
          <Typography variant="body1">実績がありません</Typography>
        )}

        {activity.completions.map((completion) => (
          <Box key={completion.id} sx={{ mb: 3 }}>
            <RelativeDate date={completion.completedAt} />
          </Box>
        ))}
      </Box>
    </>
  );
}
