"use client";

import { Box, Container, Typography } from "@mui/material";
import { ActivityForm } from "~/components/ActivityForm";
import { type UseActivityForm } from "~/hooks/activity-form";

type ActivityEditingProps = UseActivityForm;

export default function ActivityEditing(props: ActivityEditingProps) {
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

      <ActivityForm {...props} />
    </Container>
  );
}
