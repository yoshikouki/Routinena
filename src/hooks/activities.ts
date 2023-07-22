"use client";

import { type ActivityModificationParams } from "~/schemas/activities";
import { api } from "~/utils/api";
import { type Completion, type Activity } from "@prisma/client";

type ActivityWithCompletion = Activity & {
  completions?: Completion[];
};

type useActivityProps = {
  activity: ActivityWithCompletion;
};
export const useActivity = ({ activity }: useActivityProps) => {
  const { mutate: updateActivity } = api.activities.updateOne.useMutation();
  const { mutate: deleteActivity } = api.activities.deleteOne.useMutation();
  const completeMutation = api.activities.complete.useMutation();

  const complete = () => {
    completeMutation.mutate({
      activityId: activity.id,
    });
  };

  return {
    activity: completeMutation.data || activity,
    updateActivity: (params: ActivityModificationParams) =>
      updateActivity({ activityId: activity.id, ...params }),
    deleteActivity: () => deleteActivity({ activityId: activity.id }),
    complete,
    isCompleted: !!completeMutation.isSuccess,
  };
};
