"use client";

import { Close } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RelativeDate } from "~/components/RelativeDate";
import { useActivity, type ActivityModel } from "~/hooks/activities";
import { useBottomFab } from "~/hooks/bottom-fab";
import ActivityEditing from "./ActivityEditing";

export default function Activity(props: { activity: ActivityModel }) {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const { activity, onUpdate, onDelete } = useActivity({
    activity: props.activity,
    onUpdate: () => setIsEditing(false),
    onDelete: () => router.push("/dashboard"),
  });
  useBottomFab({
    icon: Close,
    props: {
      onClick: activity.onCancelShow,
      color: "secondary",
    },
  });

  return isEditing ? (
    <ActivityEditing
      activity={activity}
      onSubmit={onUpdate}
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
        <Button onClick={onDelete} color="warning" variant="outlined" fullWidth>
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
