"use client";

import { type Activity } from "@prisma/client";
import { useState } from "react";
import { type ActivityModificationParams } from "~/schemas/activities";
import { api } from "~/utils/api";

export type ActivityWithCompletions = Activity & {
  completions: {
    id: string;
    completedAt: Date;
  }[];
};
export type ActivitiesWithCompletions = ActivityWithCompletions[];

export type ActivityModel = ActivityWithCompletions & {
  onUpdate: (updatedActivity: ActivityWithCompletions) => void;
};

const updateActivity = (
  activityStates: ActivitiesWithCompletions,
  updatedActivity: ActivityWithCompletions,
) => {
  return activityStates.map((activity) =>
    activity.id === updatedActivity.id
      ? { ...activity, ...updatedActivity }
      : activity,
  );
};

const deleteActivity = (
  activityStates: ActivitiesWithCompletions,
  activityId: string,
) => {
  return activityStates.filter((activity) => activity.id !== activityId);
};

export const useActivities = () => {
  const [activityData] = api.activities.getAll.useSuspenseQuery();
  const [activityStates, setActivityStates] = useState(() => activityData);

  const activities = activityStates.map((activity) => {
    return {
      ...activity,
      onUpdate: (updatedActivity: ActivityWithCompletions) =>
        setActivityStates((prev) => updateActivity(prev, updatedActivity)),
      onDelete: () =>
        setActivityStates((prev) => deleteActivity(prev, activity.id)),
    };
  });
  return { activities };
};

type useActivityProps = {
  activity: ActivityWithCompletions | ActivityModel;
  onUpdate?: () => void;
  onDelete?: () => void;
};
export const useActivity = (props: useActivityProps) => {
  const [activity, setActivity] = useState(() => props.activity);

  const { mutate: updateActivity } = api.activities.updateOne.useMutation();
  const onUpdate = (updatedActivity: ActivityModificationParams) => {
    updateActivity({ activityId: activity.id, ...updatedActivity });
    setActivity({
      ...activity,
      ...updatedActivity,
    });
    if (props.onUpdate) {
      props.onUpdate();
    }
  };

  const { mutate: deleteActivity } = api.activities.deleteOne.useMutation();
  const onDelete = () => {
    deleteActivity({ activityId: activity.id });
    if (props.onDelete) {
      props.onDelete();
    }
  };

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
    onUpdate,
    onDelete,
    complete,
    isCompleting,
    isCompleted,
    latestCompletion,
  };
};
