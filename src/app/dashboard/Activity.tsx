"use client";

import {
  CheckRounded,
  Close,
  DeleteRounded,
  EditRounded,
  SyncRounded,
} from "@mui/icons-material";
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
  const { activity, onUpdate, onDelete, onComplete, isCompleting, isCompleted } = useActivity({
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        pb: 40,
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
        }}
      >
        <Typography variant="h1">{activity.name}</Typography>

        <Typography variant="body1" sx={{ mt: 4 }}>
          {activity.description}
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h2">履歴</Typography>

          {activity.completions.length === 0 && (
            <Typography variant="body1">履歴がありません</Typography>
          )}

          {activity.completions.map((completion) => (
            <Box key={completion.id} sx={{ mt: 3 }}>
              <RelativeDate date={completion.completedAt} />
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          mt: 6,
          display: "flex",
          // flexWrap: "nowrap",
          gap: 1,
          mb: 15,
          px: 2,
          width: "100%",
        }}
      >
        <Button
          onClick={onComplete}
          startIcon={isCompleting ? <SyncRounded /> : <CheckRounded />}
          color={isCompleted ? "success" : "primary"}
          variant="contained"
          sx={{ px: "auto", flexGrow: 1 }}
        >
          {activity.completions.length}
        </Button>

        <Button onClick={() => setIsEditing(true)} sx={{ flexShrink: 1 }}>
          <EditRounded />
        </Button>

        <Button onClick={onDelete} color="warning" sx={{ flexShrink: 1 }}>
          <DeleteRounded />
        </Button>
      </Box>
    </Box>
  );
}
