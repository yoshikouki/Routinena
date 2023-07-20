"use client";

import { api } from "~/utils/api";

export const useActivities = () => {
  const { data: activities } = api.activities.getAll.useQuery();
  return {
    activities,
  };
};

interface useActivityProps {
  activityId: string;
}
export const useActivity = ({ activityId }: useActivityProps) => {
  const { data: activity } = api.activities.getOne.useQuery({ activityId });
  const { mutate: deleteActivity } = api.activities.deleteOne.useMutation();
  return {
    activity,
    deleteActivity: () => deleteActivity({ activityId }),
  };
};
