"use client";

import { Box, Container, Typography } from "@mui/material";
import { type Activity } from "@prisma/client";

import { ActivityForm } from "~/components/ActivityForm";

type ActivityEditingProps = {
  activity: Activity;
  onActivityUpdate: () => void;
  onCancel: () => void;
};
export default function ActivityEditing({
  activity,
  onActivityUpdate,
  onCancel,
}: ActivityEditingProps) {
  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        mt: 12,
        padding: 0,
        gap: 4,
      }}
    >
      <Box>
        <Typography variant="h1">活動の作成</Typography>
      </Box>

      <ActivityForm
        activity={activity}
        onSubmit={onActivityUpdate}
        onCancel={onCancel}
      />
    </Container>
  );
}
