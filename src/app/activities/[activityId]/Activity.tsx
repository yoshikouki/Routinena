"use client";

import { Box, Button, Container, Typography } from "@mui/material";

import ActivityEditing from "./ActivityEditing";
import { type ActivityWithCompletions } from "~/hooks/server-activities";
import { useActivity } from "~/hooks/activities";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Activity({ activity }: { activity: ActivityWithCompletions }) {
  const { deleteActivity } = useActivity({ activity });
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const onActivityUpdate = () => {
    setIsEditing(false);
  };
  const onActivityDeletion = () => {
    deleteActivity();
    router.push("/dashboard");
  };

  return isEditing ? (
    <ActivityEditing
      activity={activity}
      onActivityUpdate={onActivityUpdate}
      onCancel={() => setIsEditing(false)}
    />
  ) : (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        mt: 10,
        padding: 0,
        gap: 4,
      }}
    >
      <Box>
        <Typography
          component="h1"
          sx={{
            fontWeight: 900,
            fontSize: 30,
          }}
        >
          {activity.name}
        </Typography>
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
          onClick={onActivityDeletion}
          color="warning"
          variant="outlined"
          fullWidth
        >
          削除
        </Button>
      </Box>
    </Container>
  );
}
