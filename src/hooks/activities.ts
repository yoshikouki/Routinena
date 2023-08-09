"use client";

import { type Activity } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
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
  onShow: () => void;
  onCancelShow: () => void;
  onEdit: () => void;
  onCancelEdit: () => void;
  onUpdate: (updatedActivity: ActivityWithCompletions) => void;
  onDelete: () => void;
};
type ActivitiesObject = Record<string, ActivityModel>;
type DisplayMode =
  | {
      mode: "dashboard";
      activityId: null;
    }
  | {
      mode: "show" | "edit";
      activityId: string;
    };

export const useActivities = () => {
  const [activitiesObject, setActivitiesObject] = useState<ActivitiesObject>(
    {},
  );
  const [displayMode, setDisplayMode] = useState<DisplayMode>({
    mode: "dashboard",
    activityId: null,
  });
  const activities = Object.values(activitiesObject);
  const currentActivity = activitiesObject[displayMode.activityId ?? ""];

  const modifyActivitiesObject = (updatedActivity: ActivityWithCompletions) => {
    setActivitiesObject((prev) => {
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

  const removeActivitiesObject = (activityId: string) => {
    setActivitiesObject((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [activityId]: _, ...newActivityStates } = prev;
      return newActivityStates;
    });
  };

  const generateActivitiesModel = useCallback(
    (activities: ActivitiesWithCompletions) => {
      return activities.reduce<ActivitiesObject>((acc, activity) => {
        acc[activity.id] = {
          ...activity,
          onShow: () => {
            setDisplayMode({ mode: "show", activityId: activity.id });
          },
          onCancelShow: () => {
            setDisplayMode({ mode: "dashboard", activityId: null });
          },
          onEdit: () => {
            setDisplayMode({ mode: "edit", activityId: activity.id });
          },
          onCancelEdit: () => {
            setDisplayMode({ mode: "edit", activityId: activity.id });
          },
          onUpdate: (updatedActivity: ActivityWithCompletions) => {
            modifyActivitiesObject(updatedActivity);
            setDisplayMode({
              mode: "show",
              activityId: updatedActivity.id,
            });
          },
          onDelete: () => {
            removeActivitiesObject(activity.id);
            setDisplayMode({ mode: "dashboard", activityId: null });
          },
        };
        return acc;
      }, {});
    },
    [],
  );

  const { data: fetchedActivities } = api.activities.getAll.useQuery();

  useEffect(() => {
    if (fetchedActivities) {
      setActivitiesObject(generateActivitiesModel(fetchedActivities));
    }
  }, [fetchedActivities, generateActivitiesModel]);

  return {
    activities,
    activitiesObject,
    currentActivity,
    currentDisplayMode: displayMode.mode,
  };
};

type useActivityProps = {
  activity: ActivityModel;
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
      setActivity({ ...activity, ...data });
    },
  });
  const latestCompletion = activity.completions[0];
  const isCompleting = completeMutation.isLoading;
  const isCompleted = completeMutation.isSuccess;
  const onComplete = () => {
    completeMutation.mutate({
      activityId: activity.id,
    });
  };

  return {
    activity,
    onUpdate,
    onDelete,
    onComplete,
    isCompleting,
    isCompleted,
    latestCompletion,
    completions: activity.completions,
  };
};
