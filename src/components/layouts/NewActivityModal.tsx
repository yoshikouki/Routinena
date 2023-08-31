"use client";

import { Typography } from "@mui/material";
import { useBottomFab } from "~/hooks/bottom-fab";
import { ActivityForm } from "../ActivityForm";
import Overlap from "../Overlap";

export const NewActivityModal = () => {
  const { openNewActivity, onCloseNewActivity } = useBottomFab();

  return (
    <Overlap open={openNewActivity} onClose={onCloseNewActivity}>
      <Typography variant="h1">活動の作成</Typography>
      <ActivityForm
        onSubmit={onCloseNewActivity}
        onCancel={onCloseNewActivity}
      />
    </Overlap>
  );
};
