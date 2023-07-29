"use client";

import { useState } from "react";
import { type ActivityWithCompletions } from "~/hooks/server-activities";
import { type ActivityModificationParams } from "~/schemas/activities";
import { api } from "~/utils/api";

type useActivityProps = {
  activity: ActivityWithCompletions;
};
export const useActivity = (props: useActivityProps) => {
  const [activity, setActivity] = useState(props.activity);
  const { mutate: updateActivity } = api.activities.updateOne.useMutation();
  const { mutate: deleteActivity } = api.activities.deleteOne.useMutation();
  const completeMutation = api.activities.complete.useMutation({
    onSuccess: (data) => {
      setActivity(data);
    },
  });

  const latestCompletion = activity.completions[0];
  const isCompleting = completeMutation.isLoading;
  const isCompleted = completeMutation.isSuccess;
  const complete = () => {
    completeMutation.mutate({
      activityId: activity.id,
    });
  };

  return {
    activity,
    setActivity,
    updateActivity: (params: ActivityModificationParams) =>
      updateActivity({ activityId: activity.id, ...params }),
    deleteActivity: () => deleteActivity({ activityId: activity.id }),
    complete,
    isCompleting,
    isCompleted,
    latestCompletion,
  };
};
