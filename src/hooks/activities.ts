"use client";

import { type ActivityModificationRequest } from "~/schemas/activities";
import { api } from "~/utils/api";
import { type Activity } from "@prisma/client";

export const useActivities = () => {
  const [activities] = api.activities.getAll.useSuspenseQuery();
  return {
    activities,
  };
};

type useActivityProps =
  | {
      activityId: string;
    }
  | {
      activity: Activity;
    };
export const useActivity = (props: useActivityProps) => {
  const { activity, activityId } = getActivity(props);
  const { mutate: updateActivity } = api.activities.updateOne.useMutation();
  const { mutate: deleteActivity } = api.activities.deleteOne.useMutation();
  return {
    activity,
    updateActivity: (params: ActivityModificationRequest) =>
      updateActivity({ activityId, ...params }),
    deleteActivity: () => deleteActivity({ activityId }),
  };
};

const getActivity = (props: useActivityProps) => {
  if ("activityId" in props) {
    const [activity] = api.activities.getOne.useSuspenseQuery({
      activityId: props.activityId,
    });
    return { activity, activityId: props.activityId };
  } else {
    return { activity: props.activity, activityId: props.activity.id };
  }
};
