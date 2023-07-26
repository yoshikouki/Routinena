"use client";

import { Box, Container, Typography } from "@mui/material";
import { ActivityForm } from "~/components/ActivityForm";
import { type UseActivityForm } from "~/hooks/activity-form";

type ActivityEditingProps = UseActivityForm;

export default function ActivityEditing(props: ActivityEditingProps) {
  return (
    <>
      <Box>
        <Typography variant="h1">活動の作成</Typography>
      </Box>

      <ActivityForm {...props} />
    </>
  );
}
