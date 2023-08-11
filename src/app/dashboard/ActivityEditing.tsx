"use client";

import { Close } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { ActivityForm } from "~/components/ActivityForm";
import { useActivity, type ActivityModel } from "~/hooks/activities";
import { useBottomFab } from "~/hooks/bottom-fab";

type ActivityEditingProps = {
  activity: ActivityModel;
};

export default function ActivityEditing(props: ActivityEditingProps) {
  const { activity, onUpdate } = useActivity({
    activity: props.activity,
  });
  useBottomFab({
    icon: Close,
    props: {
      onClick: activity.onCancelShow,
      color: "secondary",
    },
  });

  return (
    <>
      <Typography variant="h1">活動の編集</Typography>

      <ActivityForm
        activity={activity}
        onSubmit={onUpdate}
        onCancel={activity.onCancelEdit}
      />
    </>
  );
}
