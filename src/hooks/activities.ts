"use client";

import { type ActivityModificationRequest } from "~/schemas/activities";
import { api } from "~/utils/api";
import { type Activity } from "@prisma/client";

type useActivityProps = {
  activity: Activity;
};
export const useActivity = ({ activity }: useActivityProps) => {
  const { mutate: updateActivity } = api.activities.updateOne.useMutation();
  const { mutate: deleteActivity } = api.activities.deleteOne.useMutation();
  return {
    activity,
    updateActivity: (params: ActivityModificationRequest) =>
      updateActivity({ activityId: activity.id, ...params }),
    deleteActivity: () => deleteActivity({ activityId: activity.id }),
  };
};
