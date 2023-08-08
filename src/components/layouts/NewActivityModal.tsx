"use client";

import { useBottomFab } from "~/hooks/bottom-fab";
import { ActivityForm } from "../ActivityForm";
import Overlap from "../Overlap";

export const NewActivityModal = () => {
  const { openNewActivity, onCloseNewActivity } = useBottomFab();

  return (
    <Overlap open={openNewActivity}>
      <ActivityForm onCancel={onCloseNewActivity} />
    </Overlap>
  );
};
