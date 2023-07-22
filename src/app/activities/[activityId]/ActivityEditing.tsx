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
          活動の作成
        </Typography>
      </Box>

      <ActivityForm
        activity={activity}
        onSubmit={onActivityUpdate}
        onCancel={onCancel}
       />
    </Container>
  );
}
