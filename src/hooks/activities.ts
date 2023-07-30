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
  onDelete: () => void;
};
type ActivitiesState = Record<string, ActivityModel>;

export const useActivities = () => {
  const [activityStates, setActivityStates] = useState<ActivitiesState>({});
  const activities = Object.values(activityStates);

  const modifyActivityState = (updatedActivity: ActivityWithCompletions) => {
    setActivityStates((prev) => {
      const {
        [updatedActivity.id]: modifiedActivityState,
        ...newActivityStates
      } = prev;
      if (modifiedActivityState) {
        return {
          ...newActivityStates,
          [updatedActivity.id]: {
            ...modifiedActivityState,
            ...updatedActivity,
          },
        };
      } else {
        return prev;
      }
    });
  };

  const removeActivityState = (activityId: string) => {
    setActivityStates((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [activityId]: _, ...newActivityStates } = prev;
      return newActivityStates;
    });
  };

  api.activities.getAll.useSuspenseQuery(undefined, {
    onSuccess: (data: ActivitiesWithCompletions) => {
      setActivityStates((prev) => {
        return data.reduce((acc, activity) => {
          acc[activity.id] = {
            ...activity,
            onUpdate: (updatedActivity: ActivityWithCompletions) =>
              modifyActivityState(updatedActivity),
            onDelete: () => removeActivityState(activity.id),
          };
          return acc;
        }, prev);
      });
    },
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
