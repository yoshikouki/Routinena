"use client";

import { type ActivityModificationParams } from "~/schemas/activities";
import { api } from "~/utils/api";
import { type ActivityWithCompletions } from "~/hooks/server-activities";
import { useEffect, useState } from "react";

type useActivityProps = {
  activity: ActivityWithCompletions;
};
export const useActivity = (props: useActivityProps) => {
  const { mutate: updateActivity } = api.activities.updateOne.useMutation();
  const { mutate: deleteActivity } = api.activities.deleteOne.useMutation();
  const completeMutation = api.activities.complete.useMutation();
  const [activity, setActivity] = useState(props.activity);

  const latestCompletion = activity.completions[0];
  const isCompleted = !!completeMutation.isSuccess
  const complete = () => {
    completeMutation.mutate({
      activityId: activity.id,
    });
  };

  useEffect(() => {
    if (completeMutation.data) {
      setActivity(completeMutation.data);
    }
  }, [completeMutation.data]);

  return {
    activity,
    updateActivity: (params: ActivityModificationParams) =>
      updateActivity({ activityId: activity.id, ...params }),
    deleteActivity: () => deleteActivity({ activityId: activity.id }),
    complete,
    isCompleted,
    latestCompletion,
  };
};
