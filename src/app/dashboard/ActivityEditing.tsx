"use client";

import { Typography } from "@mui/material";
import { ActivityForm } from "~/components/ActivityForm";
import { type UseActivityForm } from "~/hooks/activity-form";

type ActivityEditingProps = UseActivityForm;

export default function ActivityEditing(props: ActivityEditingProps) {
  return (
    <>
      <Typography variant="h1">活動の編集</Typography>

      <ActivityForm {...props} />
    </>
  );
}
