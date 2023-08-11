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
  onComplete: (updatedActivity: ActivityWithCompletions) => void;
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

  const { data: fetchedActivities, isLoading } =
    api.activities.getAll.useQuery();
  const apiUtils = api.useContext();
  const refreshActivities = useCallback(
    () => void apiUtils.activities.getAll.invalidate(),
    [apiUtils],
  );

  const modifyActivitiesObject = useCallback(
    (updatedActivity: ActivityWithCompletions) => {
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
    },
    [],
  );

  const removeActivitiesObject = useCallback((activityId: string) => {
    setActivitiesObject((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [activityId]: _, ...newActivityStates } = prev;
      return { ...newActivityStates };
    });
  }, []);

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
            refreshActivities();
          },
          onDelete: () => {
            removeActivitiesObject(activity.id);
            setDisplayMode({ mode: "dashboard", activityId: null });
            refreshActivities();
          },
          onComplete: (updatedActivity: ActivityWithCompletions) => {
            modifyActivitiesObject(updatedActivity);
            refreshActivities();
          },
        };
        return acc;
      }, {});
    },
    [modifyActivitiesObject, removeActivitiesObject, refreshActivities],
  );

  useEffect(() => {
    if (!fetchedActivities) return;
    setActivitiesObject(generateActivitiesModel(fetchedActivities));
  }, [fetchedActivities, generateActivitiesModel]);

  return {
    activities: (() => Object.values(activitiesObject))(),
    activitiesObject,
    isLoading,
    currentActivity: displayMode.activityId
      ? activitiesObject[displayMode.activityId]
      : undefined,
    currentDisplayMode: displayMode.mode,
  };
};

type useActivityProps = {
  activity: ActivityModel;
  onUpdate?: () => void;
  onDelete?: () => void;
};
export const useActivity = (props: useActivityProps) => {
  const { activity } = props;

  const { mutate: updateActivity } = api.activities.updateOne.useMutation();
  const onUpdate = (updatedActivity: ActivityModificationParams) => {
    updateActivity({ activityId: activity.id, ...updatedActivity });
    activity.onUpdate({ ...activity, ...updatedActivity });
    if (props.onUpdate) {
      props.onUpdate();
    }
  };

  const { mutate: deleteActivity } = api.activities.deleteOne.useMutation();
  const onDelete = () => {
    deleteActivity({ activityId: activity.id });
    activity.onDelete();
    if (props.onDelete) {
      props.onDelete();
    }
  };

  const completeMutation = api.activities.complete.useMutation({
    onSuccess: (data) => {
      activity.onComplete({ ...activity, ...data });
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
